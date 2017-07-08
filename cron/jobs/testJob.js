
define(["wilton/Logger"], function(Logger) {

    var logger = new Logger("examples.cron.jobs.testJob");

    return {
        logHello: function() {
            logger.info("Hello from cron task!");
        }
    };
});
