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
    // modules
    "module",
    "lodash/includes",
    "lodash/isNil",
    "wilton/Logger",
    // pwdauth
    "pwdauth/authErrors",
    "pwdauth/authenticate",
    "pwdauth/createRequest",
    // local
    "../sessionManager",
    "../usersStorage"
], function(
        module, includes, isNil, Logger, //modules
        authErrors, authenticate, createRequest, // pwdauth
        sessionManager, usersStorage // local
) {
    "use strict";

    var logger = new Logger(module.id);

    function auth(request) {
        return authenticate(usersStorage.loadById, createRequest, sessionManager.createSession, request);
    }
    
    return {
        POST: function(req) {
            var token = auth(req.json());
            if (!isNil(token.error)) {
                logger.warn("Invalid login attempt, error: [" + token.error + "]");
                if (includes([authErrors.USER_NOT_FOUND, authErrors.INVALID_REQUEST_HASH], token.error)) {
                    req.sendResponse("", {
                        meta: {
                            statusCode: 403,
                            statusMessage: "Forbidden"
                        }
                    });
                } else {
                    req.sendResponse("", {
                        meta: {
                            statusCode: 400,
                            statusMessage: "Bad Request"
                        }
                    });

                }
                return;
            }
            logger.info("Login successful, token: [" + JSON.stringify(token, null,4) + "]");
            req.sendResponse(token);
        }
    };
});
