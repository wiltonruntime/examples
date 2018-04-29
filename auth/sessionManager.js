/*
 * Copyright 2018, alex at staticlibs.net
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define([
    "moment",
    "random"
], function(moment, random) {
    "use strict";

    var engine = random.engines.mt19937().autoSeed();
    // in-memory sessions storage, DB should be used with caution
    // because loadByKey is called on every request
    var storage = {};

    function createSession(user) {
        var entry = {
            sessionKey: random.uuid4(engine),
            sessionStartTime: moment().format(),
            sessionDurationMinutes: 42,
            id: user.id,
            role: user.role,
            rights: user.rights
        };
        storage[entry.sessionKey] = entry;
        return entry.sessionKey;
    }

    function loadByKey(sessionKey) {
        return storage[sessionKey];
    }

    return {
        createSession: createSession,
        loadByKey: loadByKey
    };
});
