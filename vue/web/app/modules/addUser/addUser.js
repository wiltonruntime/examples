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
    "lodash/keys",
    "app/modules/userForm/formStates",
    "text!./addUser.html"
], function (cloneDeep, keys, formStates, template) {
    "use strict";

    return {
        template: template,

        data: function() {
            return {
                user: cloneDeep(this.$store.state.userForm.userEmpty)
            };
        },

        computed: {
            errors: function() {
                return this.$store.state.userForm.validationMessages;
            },

            submitError: function() {
                return this.$store.state.userForm.submitError;
            }
        },

        methods: {

            inState: function(state) {
                return state === this.$store.state.userForm.formState;
            },

            save: function() {
                this.$store.dispatch('userForm/saveUser', this.user);
            }
        }
    };
});
