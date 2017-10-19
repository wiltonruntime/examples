
define([
    "module",
    "wilton/Channel",
    "wilton/Logger",
    "wilton/loader",
    "wilton/misc",
    "wilton/Server"
], function(module, Channel, Logger, loader, misc, Server) {
    "use strict";
    var logger = new Logger(module.id);

    // should be loaded from config file
    function loadConfig() {
        return {
            dbUrl: "sqlite://bootstrapExample.db",
            tablePageSize: 4,
            paginationUrl: "/bootstrap/views/usersList?page=",
            leftMenu: {
                urlPrefix: "/bootstrap/views/",
                items: [{
                    id: "description",
                    text: "Description"
                }, {
                    id: "addUser",
                    text: "Add User"
                }, {
                    id: "usersList",
                    text: "Users List"
                }, {
                    id: "aboutWilton",
                    text: "About Wilton"
                }]
            },
            logging: {
                appenders: [{
                    appenderType: "CONSOLE",
                    thresholdLevel: "DEBUG"
                }],
                loggers: {
                    "staticlib": "WARN",
                    "wilton": "INFO",
                    "wilton.DBConnection": "INFO",
                    "bootstrap": "DEBUG"
                }
            }
        };
    }

    return {
        main: function() {
            var conf = loadConfig();

            // init logging
            Logger.initialize(conf.logging);

            // share conf for other threads
            new Channel("bootstrap/conf", 1).send(conf);

            // init db using lazy-load deps
            require([
                "bootstrap/models/schema",
                "bootstrap/models/user",
                "bootstrap/models/conn"
            ], function(schema, user, conn) {
                schema.create();
                user.insertDummyRecords();
                conn.close();
            });

            // start server
            var server = new Server({
                tcpPort: 8080,
                views: [
                    "bootstrap/views/aboutWilton",
                    "bootstrap/views/addUser",
                    "bootstrap/views/description",
                    "bootstrap/views/usersList"
                ],
                rootRedirectLocation: "/bootstrap/views/description",
                mustache: {
                    partialsDirs: [
                        loader.findModulePath("bootstrap/components")
                    ]
                },
                documentRoots: [{
                    resource: "/docroot",
                    dirPath: loader.findModulePath("bootstrap/docroot"),
                    cacheMaxAgeSeconds: 0
                }]
            });
            logger.info("Server started: http://127.0.0.1:8080/" );

            // wait for shutdown
            misc.waitForSignal();

            logger.info("Shutting down ...");
            server.stop();
        }
    };
});
