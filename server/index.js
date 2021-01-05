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
    "wilton/Logger",
    "wilton/misc",
    "wilton/Server"
], function(Logger, misc, Server) {
    "use strict";

    var logger = new Logger("server.main");

    return function() {
        Logger.initConsole("INFO");
        var server = new Server({
            tcpPort: 8080,
            views: [
                "server/views/hi",
                "server/views/bye"
            ]
        });

        // http://127.0.0.1:8080/server/views/hi?foo=41&bar=42
        logger.info("Server is running ...");
        misc.waitForSignal();
        server.stop();
        logger.info("Server shut down");
    };
});
