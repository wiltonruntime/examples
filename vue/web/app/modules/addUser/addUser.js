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
    "lodash/cloneDeep",
    "app/components/StateAlert/StateAlert",
    "text!./addUser.html"
], function (cloneDeep, StateAlert, template) {
    "use strict";

    function store(thiz) {
        return thiz.$store.state.addUser;
    }

    return {
        template: template,

        components: {
            "state-alert": new StateAlert({
                INITIAL: {
                    color: "light",
                    message: "Add new user to the users list"
                },
                SUBMIT_IN_PROGRESS: {
                    color: "info",
                    message: "Saving user ..."
                },
                VALIDATION_FAILED: {
                    color: "danger",
                    message: "Some of the specified values were invalid"
                },
                SUBMIT_ERROR: {
                    color: "warning",
                    message: function() {
                        return store(this).submitError;
                    }
                },
                SUBMIT_SUCCESS: {
                    color: "success",
                    message: "User saved successfully"
                }
            }, function() {
                return store(this).currentState;
            })
        },

        data: function() {
            return {
                user: cloneDeep(store(this).userEmpty)
            };
        },

        computed: {
            errors: function() {
                return store(this).validationMessages;
            },

            submitError: function() {
                return store(this).submitError;
            }
        },

        methods: {

            inState: function(state) {
                return state === store(this).currentState;
            },

            save: function() {
                this.$store.dispatch('addUser/saveUser', this.user);
            }
        }
    };
});
