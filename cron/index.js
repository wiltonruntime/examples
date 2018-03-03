/*
 * Copyright 2017, alex at staticlibs.net
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
