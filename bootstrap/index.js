
define([
    "module",
    "wilton/Logger",
    "wilton/loader",
    "wilton/misc",
    "wilton/Server"
], function(module, Logger, loader, misc, Server) {
    var logger = new Logger(module.id);

    return {
        main: function() {
            Logger.initConsole("INFO");
            var server = new Server({
                tcpPort: 8080,
                views: [
                    "bootstrap/views/aboutWilton",
                    "bootstrap/views/addUser",
                    "bootstrap/views/description",
                    "bootstrap/views/usersList"
                ],
                mustache: {
                    partialsDirs: [
                        loader.findModulePath("bootstrap/mustache")
                    ]
                }
            });

            misc.waitForSignal();

            logger.info("Shutting down ...");
            server.stop();

        }
    };
});
