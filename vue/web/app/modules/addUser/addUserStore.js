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

define(function(require) {
    "use strict";

    var states = require("./addUserStates");

    return {
        namespaced: true,

        state: {

            currentState: states.INITIAL,

            userEmpty: {
                nick: "",
                email: "",
                spam: false
            },

            validationMessages: { },

            submitError: ""
        },

        mutations: {
            submitError: require("./mutations/submitError"),
            submitInProgress: require("./mutations/submitInProgress"),
            submitSuccess: require("./mutations/submitSuccess"),
            validationFailed: require("./mutations/validationFailed")
        },

        actions: {
            saveUser: require("./actions/saveUser")
        }
    };
});
