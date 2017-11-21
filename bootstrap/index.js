
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
    var appdir = misc.wiltonConfig().applicationDirectory;

    // should be loaded from config file
    function loadConfig() {
        return {
            dbUrl: "sqlite://" + appdir + "bootstrapExample.db",
            tablePageSize: 8,
            sortArrow: {
                asc: "&uarr;",
                desc: "&darr;"
            },
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
            // prepare lock for sqlite access
            new Channel(conf.dbUrl, 1);

            // init db using lazy-load deps
            require([
                "bootstrap/db",
                "bootstrap/models/schema",
                "bootstrap/models/user"
            ], function(db, schema, user) {
                schema.create();
                db.doInSyncTransaction(conf.dbUrl, function() {
                    user.insertDummyRecords();
                });
                db.close();
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
                    resource: "/web",
                    dirPath: loader.findModulePath("bootstrap/web"),
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
