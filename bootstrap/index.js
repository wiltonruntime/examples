
define([
    "module",
    "wilton/Logger",
    "wilton/loader",
    "wilton/misc",
    "wilton/Server",
    "wilton/shared",
    "bootstrap/models/schema"
], function(module, Logger, loader, misc, Server, shared, schema) {
    var logger = new Logger(module.id);

    var conf = {
        dbUrl: "sqlite://bootstrapExample.db"
    };

    shared.put("bootstrap/conf", conf);

    return {
        main: function() {
            // init logging
            Logger.initConsole("INFO");

            // create DB schema
            schema.create();

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
                },
                rootRedirectLocation: "/bootstrap/views/description"
            });
            logger.info("Server started: http://127.0.0.1:8080/" );

            misc.waitForSignal();

            logger.info("Shutting down ...");
            server.stop();

        }
    };
});
