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
    "wilton/fs",
    "wilton/Logger",
    "wilton/loader",
    "wilton/misc",
    "wilton/Server",
    "wilton/process",
    "wilton/utils"
], function(module, Channel, fs, Logger, loader, misc, Server, process, utils) {
    "use strict";
    var logger = new Logger(module.id);
    utils.checkRootModuleName(module, "launcher");

    return {
        main: function() {
            // load config file
            var conf = loader.loadAppConfig(module);

            // create necessary dirs
            fs.mkdir(conf.appdir + "log", function() {});
            fs.mkdir(conf.appdir + "work", function() {});

            // init logging
            Logger.initialize(conf.logging);

            // share conf for other threads
            new Channel("launcher/server/conf", 1).send(conf);

            // server
            logger.info("Starting server on port: [" + conf.server.tcpPort + "]");
            var server = new Server({
                ipAddress: conf.server.ipAddress,
                tcpPort: conf.server.tcpPort,
                views: [
                    "launcher/server/views/config",
                    "launcher/server/views/websocket"
                ],
                rootRedirectLocation: "/web/index.html",
                documentRoots: [{
                    resource: "/web",
                    dirPath: loader.findModulePath("launcher/web"),
                    cacheMaxAgeSeconds: conf.server.cacheMaxAgeSeconds
                },
                {
                    resource: "/stdlib",
                    zipPath: misc.wiltonConfig().wiltonHome + conf.server.stdlibFileName,
                    cacheMaxAgeSeconds: conf.server.cacheMaxAgeSeconds
                }]
            });

            if (misc.isAndroid()) {
                return;
            }

            if (misc.isWindows() || misc.isLinux()) {
                logger.info("Server started, initializing WebView ...");
                var engine = misc.isWindows() ? "rhino" : "duktape";
                process.spawn({
                    executable: misc.wiltonConfig().wiltonExecutable,
                    args: [conf.appdir + "client.js", "-j", engine],
                    outputFile: conf.appdir + "work/client_out.txt",
                    awaitExit: true
                });
            } else {
                misc.waitForSignal();
            }

            logger.info("Shutting down ...");
            server.stop();
        }
    };

});
