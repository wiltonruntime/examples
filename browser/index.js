
define([
    "wilton/loader",
    "wilton/Logger",
    "wilton/misc",
    "wilton/Server"
], function(loader, Logger, misc, Server) {
    "use strict";

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
            misc.waitForSignal();
            server.stop();
        }
    };
});

