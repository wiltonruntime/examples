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
    "wilton/loader",
    "wilton/Logger",
    "wilton/misc",
    "wilton/Server"
], function(module, loader, Logger, misc, Server) {
    "use strict";
    var logger = new Logger(module.id);

    return {
        main: function() {
            Logger.initConsole("INFO");
            var server = new Server({
                views: [],
                rootRedirectLocation: "/web/index.html",
                documentRoots: [{
                    resource: "/web/",
                    dirPath: loader.findModulePath("browser/web"),
                    cacheMaxAgeSeconds: 0
                }, 
                {
                    resource: "/stdlib/",
                    zipPath: misc.wiltonConfig().applicationDirectory + "std.wlib",
//                    dirPath: "/home/alex/projects/wilton/js/",
                    cacheMaxAgeSeconds: 0
                }]
            });
            logger.info("Test server started, open in browser: http://127.0.0.1:8080/")
            misc.waitForSignal();
            server.stop();
        }
    };
});

