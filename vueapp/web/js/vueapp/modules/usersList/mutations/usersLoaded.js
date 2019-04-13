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
    "lodash/isArray",
    "lodash/isNumber",
    "lodash/isObject",
    "vue",
    "../usersListStates"
], function(isArray, isNumber, isObject, Vue, states) {
    "use strict";

    return function(state, resp) {
        if (isObject(resp) && isArray(resp.users) && isNumber(resp.count)) {
            Vue.set(state, "count", resp.count);
            if (resp.count > 0) {
                state.users.splice(0);
                Array.prototype.push.apply(state.users, resp.users);
                Vue.set(state, "currentState", states.SUCCESS);
            } else {
                Vue.set(state, "currentState", states.NO_DATA);
            }
        } else {
            Vue.set(state, "currentState", states.ERROR);
            Vue.set(state, "error", "Invalid reponse from server");
        }
    };
});
