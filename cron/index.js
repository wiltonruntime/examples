
define([
        "wilton/CronTask",
        "wilton/Logger",
        "wilton/thread"
], function(CronTask, Logger, thread) {

    Logger.initialize({
        appenders: [{
                appenderType: "CONSOLE",
                thresholdLevel: "INFO"
            }
        ]
    });

    var logger = new Logger("examples.cron.index");

    return {
        main: function() {
            logger.info("Starting cron task ...");

            var cron = new CronTask({
                expression: "* * * * * *",
                callbackScript: {
                    module: "examples/cron/jobs/testJob",
                    func: "logHello",
                    args: []
                }
            });
            logger.info("Cron task started");
            thread.sleepMillis(5000);
            logger.info("Shutting down ...");
            cron.stop();
        }
    };
});
