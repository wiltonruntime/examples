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
    "lodash/debounce",
    "wilton/web/httpClient",
    "json!/vueapp/server/views/config"
], function(debounce, http, conf) {
    "use strict";

    return function(context, user) {
        context.commit("submitInProgress");

        http.sendRequest("/vueapp/server/views/addUser", {
            data: user,
            meta: {
                timeoutMillis: conf.requestTimeoutMillis
            }
        }, debounce(function(err, resp) {
            if (err) {
                if (resp.responseCode >= 400 && resp.responseCode < 500) {
                    resp.json(function(err1, obj) {
                        if (err1) {
                            context.commit("submitError", err1);
                        } else {
                            context.commit("validationFailed", obj.errors);
                        }
                    });
                } else {
                    context.commit("submitError", err);
                }
            } else {
                context.commit("submitSuccess", user);
            }
        }, conf.debounceWaitMillis));
    };
});
