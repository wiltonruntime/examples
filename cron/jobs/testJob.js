
define(["wilton/Logger"], function(Logger) {
    "use strict";

    var logger = new Logger("examples.cron.jobs.testJob");

    return {
        logHello: function() {
            logger.info("Hello from cron task!");
        }
    };
});
