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
    "pwdauth/createPasswordHash"
], function(createPasswordHash) {
    "use strict";

    // DB with a "slow" access can be used here
    // loadById is called only during the initial authentication
    var storage = {};

    // pre-populate a user

    storage["login1"] = {
        id: "login1",
        pwdHash: createPasswordHash("password1", "login1"),
        role: "admin",
        rights: ["foo1", "bar1"]
    };

    // DB access functions

    function loadById(userId) {
        return storage[userId];
    }

    return {
        loadById: loadById
    };
});
