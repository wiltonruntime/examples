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
    "wilton/Logger",
    "wilton/misc",
    "wilton/process",
    "wilton/net",
    "../conf"
], function(module, Logger, misc, process, net, conf) {
    "use strict";
    var logger = new Logger(module.id);

    return function(name) {
        var path = conf.appdir + "work/" + name + "/index.js";
        logger.info("Is due to start application on path: [" + path + "]");
        process.spawn({
            executable: misc.wiltonConfig().wiltonExecutable,
            args: [path],
            outputFile: conf.appdir + "work/app_out.txt",
            awaitExit: false
        });
        logger.info("Application spawned, waiting for initialization ...");
        net.waitForTcpConnection({
            ipAddress: "127.0.0.1",
            tcpPort: conf.web.appPort,
            timeoutMillis: 10000 
        });
        logger.info("Application initialization complete");
    };
});
