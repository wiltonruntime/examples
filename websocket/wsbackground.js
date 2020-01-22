/*
 * Copyright 2020, alex at staticlibs.net
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
    "wilton/DelayedWebSocket",
    "wilton/Logger",
    "wilton/thread"
], function(module, Channel, DelayedWebSocket, Logger, thread) {
    "use strict";
    var logger = new Logger(module.id);

    var chan = Channel.lookup("wsbackground/input");

    return function() {
        for (;;) {
            var input = chan.receive();
            var ws = new DelayedWebSocket(input.webSocketHandle);
            // add delay
            thread.sleepMillis(1500);
            logger.info("Mirroring WebSocket message back, data: [" + input.msg + "] ...");
            ws.send(input.msg);
        }
    };
});
