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
    "module",
    "lodash/cloneDeep",
    "vue-require/store/dispatch",
    "vue-require/store/state",
    "vueapp/components/StateAlert",
    "text!./addUser.html"
], function (module, cloneDeep, dispatch, state, StateAlert, template) {
    "use strict";

    return {
        template: template,

        components: {
            "state-alert": new StateAlert({
                INITIAL: ["light", "Add new user to the users list"],
                SUBMIT_IN_PROGRESS: ["info", "Saving user ..."],
                VALIDATION_FAILED: ["danger", "Some of the specified values were invalid"],
                SUBMIT_ERROR: ["warning", function() { return state(module).submitError; }],
                SUBMIT_SUCCESS: ["success", "User saved successfully"]
            }, function() {
                return state(module).currentState;
            })
        },

        data: function() {
            return {
                user: cloneDeep(state(module).userEmpty)
            };
        },

        computed: {
            errors: function() {
                return state(module).validationMessages;
            },

            submitError: function() {
                return state(module).submitError;
            }
        },

        methods: {

            inState: function(st) {
                return st === state(module).currentState;
            },

            save: function() {
                dispatch('addUser/saveUser', this.user);
            }
        }
    };
});
