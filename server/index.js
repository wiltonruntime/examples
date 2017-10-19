
define([
    "wilton/httpClient",
    "wilton/Logger",
    "wilton/Server",
    "wilton/thread"
], function(http, Logger, Server, thread) {
    "use strict";

    var logger = new Logger("server.main");

    return {
        main: function() {
            Logger.initConsole("INFO");
            var server = new Server({
                tcpPort: 8080,
                views: [
                    "server/views/hi",
                    "server/views/bye"
                ]
            });

            // http://127.0.0.1:8080/server/views/hi?foo=41&bar=42

            for(;;) {
                logger.info("Server is running ...");
                thread.sleepMillis(5000);
            }            
        }
    };
});
