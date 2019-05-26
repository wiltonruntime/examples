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
    "wilton/loader",
    "wilton/misc",
    "wilton/Server",
    "wilton/utils"
], function(module, Logger, loader, misc, Server, utils) {
    "use strict";
    var logger = new Logger(module.id);
    utils.checkRootModuleName(module, "svgchart");

    return {
        main: function() {
            var conf = loader.loadAppConfig(module);

            // init logging
            Logger.initConsole("INFO");

            // start server
            var server = new Server({
                ipAddress: conf.server.ipAddress,
                tcpPort: conf.server.tcpPort,
                views: [
                    "svgchart/server/views/pdfgen"
                ],
                rootRedirectLocation: "/web/index.html",
                documentRoots: [{
                    resource: "/web",
                    dirPath: loader.findModulePath("svgchart/web"),
                    cacheMaxAgeSeconds: conf.server.cacheMaxAgeSeconds
                },
                {
                    resource: "/stdlib",
                    zipPath: misc.wiltonConfig().wiltonHome + conf.server.stdlibFileName,
                    cacheMaxAgeSeconds: conf.server.cacheMaxAgeSeconds
                }]
            });
            logger.info("Server started, press Ctrl+C to shut down");

            // wait for shutdown
            misc.waitForSignal();

            logger.info("Shutting down ...");
            server.stop();
        }
    };
});
