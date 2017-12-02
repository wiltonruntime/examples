
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

