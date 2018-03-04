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
    "assert",
    "moment",
    "pwdauth/createPasswordHash",
    "pwdauth/createRequestHash",
    "wilton/httpClient"
], function(assert, moment, createPasswordHash, createRequestHash, http) {
    "use strict";

    return {
        main: function() {
            // restricted url returns 403
            var resp403 = http.sendRequest("http://127.0.0.1:8080/auth/views/restricted", {
                meta: {
                    abortOnResponseError: false
                }
            });
            assert.equal(resp403.responseCode, 403);

            // login
            var userId = "foo";
            var pwdClear = "secret1";
            var pwdHash = createPasswordHash(userId, pwdClear);
            var timestamp = moment();
            var respLogin = http.sendRequest("http://127.0.0.1:8080/auth/views/login", {
                data: {
                    userid: "foo",
                    timestamp: timestamp.format(),
                    hash: createRequestHash(userId, pwdHash, timestamp)
                }
            });
            assert.equal(respLogin.responseCode, 200);
            var token = respLogin.json();
            print("Auth token obtained: [" + JSON.stringify(token, null, 4) + "]");

            // access restricted resource
            var respRestricted = http.sendRequest("http://127.0.0.1:8080/auth/views/restricted", {
                meta: {
                    headers: {
                        Authorization: JSON.stringify(token)
                    }
                }
            });
            assert.equal(respRestricted.responseCode, 200);
            print("Restricted response: [" + respRestricted.data + "]");
        }
    };
});
