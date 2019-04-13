
/*
 * Copyright 2019, alex at staticlibs.net
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
    "vue-require/router/push",
    "vue-require/store/dispatch",
    "kiosk/components/header/Header",
    "text!./step1.html"
], function (module, push, dispatch, Header, template) {
    "use strict";

    return {
        template: template,

        components: {
            "kiosk-header": new Header("Step 1",
                    "Detailed description of the first step of important business process")
        },

        data: function() {
            return {
            };
        },

        methods: {
            toStep2: function() {
                dispatch("step1/finalizeStep1", 2);
                push("/step2");
            }
        }
    };
});