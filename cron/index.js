
define([
        "wilton/CronTask",
        "wilton/Logger",
        "wilton/thread"
], function(CronTask, Logger, thread) {
    "use strict";

    var logger = new Logger("cron.index");

    return {
        main: function() {
            Logger.initConsole("INFO");
            logger.info("Starting cron task ...");

            var cron = new CronTask({
                expression: "* * * * * *",
                callbackScript: {
                    module: "cron/jobs/testJob",
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
