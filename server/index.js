
define([
    "wilton/httpClient",
    "wilton/Logger",
    "wilton/Server",
    "wilton/thread"
], function(http, Logger, Server, thread) {

    Logger.initialize({
        appenders: [{
                appenderType: "CONSOLE",
                thresholdLevel: "INFO"
            }
        ]
    });

    var logger = new Logger("examples.server.main");

    return {
        main: function() {
            var server = new Server({
                tcpPort: 8080,
                views: [
                    "examples/server/views/hi",
                    "examples/server/views/bye"
                ]
            });

            // http://127.0.0.1:8080/examples/server/views/hi?foo=41&bar=42

            for(;;) {
                logger.info("Server is running ...");
                thread.sleepMillis(5000);
            }            
        }
    };
});
