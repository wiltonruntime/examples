/*
 * Copyright 2017, alex at staticlibs.net
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
    "wilton/Channel",
    "wilton/Logger"
], function(module, Channel, Logger) {
    "use strict";
    var logger = new Logger(module.id);

    var chan = Channel.lookup("wsbackground/input");

    return {
        WSOPEN: function(req) {
            logger.info("WebSocket connection established, id: [" + req.getWebSocketId() + "]");
            req.sendWebSocket({
                msg: "WebSocket connection opened successfully"
            });
        },

        WSMESSAGE: function(req) {
            logger.info("WebSocket message received, data: [" + req.data() + "] ...");
            //req.sendWebSocket(req.data());
            // instead of responding immediately lets
            // process this message in background thread
            var handle = req.retainWebSocket();
            chan.offer({
                webSocketHandle: handle,
                msg: req.data()
            });
        },

        WSCLOSE: function(req) {
            logger.info("WebSocket connection closed, id: [" + req.getWebSocketId() + "]");
        }

    };
});
