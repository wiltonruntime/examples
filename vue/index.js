
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
            paginationUrl: "/vue/views/usersList?page=",
            leftMenu: {
                urlPrefix: "/vue/views/",
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
            new Channel("vue/conf", 1).send(conf);

            // init db using lazy-load deps
            require([
                "vue/models/schema",
                "vue/models/user",
                "vue/models/conn"
            ], function(schema, user, conn) {
                schema.create();
                user.insertDummyRecords();
                conn.close();
            });

            // start server
            var server = new Server({
                tcpPort: 4200,
                views: [
                    "vue/views/aboutWilton",
                    "vue/views/addUser",
                    "vue/views/description",
                    "vue/views/usersList"
                ],
                rootRedirectLocation: "/docroot/index.html",
                documentRoots: [{
                    resource: "/docroot",
                    dirPath: loader.findModulePath("vue/docroot"),
                    cacheMaxAgeSeconds: 0
                }]
            });
            logger.info("Server started: http://127.0.0.1:4200/" );

            // wait for shutdown
            misc.waitForSignal();

            logger.info("Shutting down ...");
            server.stop();
        }
    };
});
