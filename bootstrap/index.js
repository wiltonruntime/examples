
define([
    "module",
    "wilton/Logger",
    "wilton/loader",
    "wilton/misc",
    "wilton/Server",
    "wilton/shared"
], function(module, Logger, loader, misc, Server, shared) {
    var logger = new Logger(module.id);

    var conf = {
        dbUrl: "sqlite://bootstrapExample.db"
    };

    shared.put("bootstrap/conf", conf);

    return {
        main: function() {
            // init logging
            Logger.initConsole("INFO");

            // start server
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
