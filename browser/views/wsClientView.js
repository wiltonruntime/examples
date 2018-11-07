
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
    "wilton/Channel",
    "wilton/Server",
    "wilton/thread"
], function(Channel, Server, thread) {
    "use strict";

    return {
        WSMESSAGE: function(req) {
            // timeout check
            if (true === req.json().payload.slow) {
                thread.sleepMillis(1000);
            }
            // mirror
            req.sendWebSocket(req.json());
        },

        POST: function(req) {
            // broadcast received data
            var serverHandleJson = Channel.lookup("server/instance").peek();
            var server = new Server(serverHandleJson);
            server.broadcastWebSocket({
                path: "/browser/views/wsClientView",
                message: req.json()
            });
        }
    };
});
