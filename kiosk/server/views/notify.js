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
    "module",
    "wilton/Channel",
    "wilton/Logger",
    "wilton/Server"
], function(module, Channel, Logger, Server) {
    "use strict";
    var logger = new Logger(module.id);

    return {
        GET: function() {
            logger.debug("Notification request received ...");
            var serverHandleJson = Channel.lookup("kiosk/server/instance").peek();
            var server = new Server(serverHandleJson);
            server.broadcastWebSocket({
                path: "/kiosk/server/views/websocket",
                message: {
                    broadcast: "kiosk-server-notification",
                    payload: {
                        msg: "hi!"
                    }
                }
            });
            logger.info("Message broadcasted successfully");
        }
    };
});
