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
    "vue-require/websocket/socketHolder",
    "wilton/web/wsClient"
], function(socketHolder, wsClient) {
    "use strict";

    return function(context, url) {

        wsClient.open(url, {}, function(err, sock) {
            if (err) {
               console.error(err);
            } else {
                // race condition here should be negligible
                socketHolder.set(sock);
                // subscribe for repetitions
                wsClient.subscribe(sock, "kiosk-server-notification", function(err, payload) {
                    if (err) {
                       console.error(err);
                    } else {
                        console.log("Server notification received:");
                        console.log(payload);
                    }
                });
            }
        });
    };
});