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
    "random",
    "pwdauth/createPasswordHash"
], function(random, createPasswordHash) {
    "use strict";

    var userInDB = {
        id: "login1",
        pwdHash: createPasswordHash("password1", "login1"),
        sessionKey: undefined,
        sessionStartTime: undefined,
        sessionDurationMinutes: 30,
        role: "admin",
        rights: ["foo1", "bar1"]
    };

    function loadById(userId) {
        if (userInDB.id === userId){
            return userInDB;
        }
        return null;
    }

    function loadByToken(token) {
        if (userInDB.sessionKey === token){
            return userInDB;
        }
        return null;
    }

    return {
        loadById: loadById,
        loadByToken: loadByToken
    };
});
