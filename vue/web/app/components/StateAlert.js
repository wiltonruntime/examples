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
    "text!./StateAlert.html"
], function(template) {
    "use strict";

    return function(states, currentStateFun) {

        this.template = template;

        this.computed = {
            cssClasses: function() {
                var st = states[currentStateFun.apply(this)];
                var clazz = st.color || st[0];
                var res = {
                    alert: true
                };
                res["alert-" + clazz] = true;
                return res;
            },

            message: function() {
                var st = states[currentStateFun.apply(this)];
                var msg = st.message || st[1];
                if ("function" === typeof(msg)) {
                    return msg.apply(this);
                } else {
                    return msg;
                }
            }
        };
    };
});
