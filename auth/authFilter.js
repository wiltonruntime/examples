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
    "lodash/isNil",
    "lodash/isString",
    "wilton/Logger",
    // pwdauth
    "pwdauth/authorize",
    // local
    "./sessionManager"
], function(
        module, isNil, isString, Logger, //modules
        authorize, // pwdauth
        sessionManager // local
) {
    "use strict";

    var logger = new Logger(module.id);

    function auth(token) {
        return authorize(sessionManager.loadByKey, token);
    }

    return function(req, doFilter) {
        // pass login requests
        if("/auth/views/login" === req.meta().pathname) {
            doFilter(req);
            return;
        }

        // check token
        if (!req.headers().hasOwnProperty("Authorization") ||
                !isString(req.headers().Authorization)) {
            logger.warn("Invalid access attempt: 'Authorization' header absent");
            req.sendResponse("", {
                meta: {
                    statusCode: 403,
                    statusMessage: "Forbidden"
                }
            });
            return;
        }
        var token = JSON.parse(req.headers().Authorization);
        var authResult = auth(token);
        if (!isNil(authResult.error)) {
            logger.warn("Invalid access attempt, error: [" + authResult.error + "]");
            req.sendResponse("", {
                meta: {
                    statusCode: 403,
                    statusMessage: "Forbidden"
                }
            });
            return;
        }

        // pass checked request
        req.headers().myappUserId = authResult.id;
        req.headers().myappPrivileges = authResult.rights;
        doFilter(req);
    };
});
