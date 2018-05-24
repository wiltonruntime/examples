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
    "lodash/forEach",
    "lodash/keys",
    "vue",
    "../addUserStates"
], function(forEach, keys, Vue, states) {
    "use strict";

    return function(state) {
        // hide validation messages
        var klist = keys(state.validationMessages);
        forEach(klist, function(key) {
            Vue.delete(state.validationMessages, key);
        });

        // set status
        Vue.set(state, "currentState", states.SUBMIT_IN_PROGRESS);
    };
});
