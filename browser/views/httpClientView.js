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
    "wilton/thread"
], function(thread) {
    "use strict";

    return {
        GET: function(req) {
            var action = req.headers()["X-Test-Action"];
            if ("fail" === action) {
                req.sendResponse("failresp", {
                    meta: {
                        statusCode: 500,
                        statusMessage: "fail"
                    }
                });
            } else if ("timeout" === action) {
                thread.sleepMillis(1000);
                req.sendResponse("timeout");
            } else if ("json" === action) {
                req.sendResponse({
                    foo: 42
                });
            } else {
                req.sendResponse("OK");
            }
        },

        POST: function(req) {
            req.sendResponse(req.data());
        }
    };
});
