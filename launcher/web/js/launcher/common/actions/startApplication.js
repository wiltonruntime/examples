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
    "vue-require/store/checkActionError",
    "vue-require/websocket/backendcall",
    "json!/launcher/server/views/config"
], function(checkActionError, backendcall, conf) {
    "use strict";

    return function(context, name) {
        backendcall({
            module: "launcher/server/calls/startApplication",
            args: [name]
        }, function(err) {
            if (checkActionError(err)) return;
            window.location.href = "http://127.0.0.1:" + conf.appPort;
        });
    };
});
