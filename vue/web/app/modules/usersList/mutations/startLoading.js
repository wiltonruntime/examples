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
    "lodash/isNumber",
    "lodash/isObject",
    "lodash/isString",
    "vue",
    "../usersListStates"
], function(isNumber, isObject, isString, Vue, states) {
    "use strict";

    return function(state, params) {
        Vue.set(state, "currentState", states.LOADING);
        if (isObject(params)) {
            if (isNumber(params.page)) {
                Vue.set(state, "currentPage", params.page);
            }
            if (isString(params.sortval)) {
                Vue.set(state, "sortval", params.sortval);
            }
            if (isString(params.sortdir)) {
                Vue.set(state, "sortdir", params.sortdir);
            }
        }
    };
});
