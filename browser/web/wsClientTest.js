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
    "wilton/web/httpClient",
    "wilton/web/wsClient"
], function(assert, http, ws) {
    "use strict";

    var wsUrl = "ws://127.0.0.1:8080/browser/views/wsClientView";
    var httpUrl = "http://127.0.0.1:8080/browser/views/wsClientView";

    var req = {
        foo: 42,
        bar: "baz"
    };

    var bc = {
        foo: 43,
        bar: "boo"
    };

    var sr = {
        slow: true
    };

    // request-response
    ws.open(wsUrl, {
        timeoutMillis: 500
    }, function(err, socket) {
        assert(null === err);
        
        ws.send(socket, req, function(err, resp) {
            assert(null === err);
            // server mirrored message
            assert.deepEqual(resp, req);

            // broadcast
            ws.subscribe(socket, "foobar", function(err, message) {
                assert(null === err);

                assert.deepEqual(message, bc);

                // timeout
                ws.send(socket, sr, function(err) {
                    assert(err);
                    assert(err.length > 0);
                    
                    // close
                    ws.close(socket);
                    console.log("test: wsClient");
                });
            });

            // activate broadcast
            http.sendRequest(httpUrl, {
                data: {
                    broadcast: "foobar",
                    payload: bc
                }
            });
        });
    });
});
