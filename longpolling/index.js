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
    "module",
    "wilton/Channel",
    "wilton/Logger",
    "wilton/misc",
    "wilton/Server",
    "wilton/thread"
], function(module, Channel, Logger, misc, Server, thread) {
    "use strict";

    var logger = new Logger(module.id);

    return {
        main: function() {
            Logger.initConsole("INFO");
            logger.info("Starting server ...");

            var chan = new Channel("receiveChannel");
            thread.run({
                callbackScript: {
                    module: "longpolling/worker",
                    func: "run"
                }
            });

            var server = new Server({
                tcpPort: 8080,
                views: [
                    "longpolling/view"
                ]
            });
            logger.info("Server started: http://127.0.0.1:8080/longpolling/view");

            // wait for shutdown
            misc.waitForSignal();

            logger.info("Shutting down ...");
            chan.send({
                poisoned: true
            }, 1000);
            server.stop();
            logger.info("Shutdown complete");
        }
    };
});
