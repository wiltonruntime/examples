/*
 * Copyright 2018, alex at staticlibs.net
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
    // modules
    "module",
    "lodash/filter",
    "lodash/forEach",
    "lodash/isNil",
    "lodash/isNumber",
    "moment",
    // wilton
    "wilton/Channel",
    "wilton/DelayedResponse",
    "wilton/Logger",
    "wilton/wiltoncall"
], function(
        module, filter, forEach, isNil, isNumber, moment, //modules
        Channel, DelayedResponse, Logger, wiltoncall // wilton
) {
    "use strict";

    var logger = new Logger(module.id);
    // better data structure may be used
    var queue = [];
    var chan = Channel.lookup("receiveChannel");

    return {
        run: function() {
            logger.info("Starting worker ...");
            logger.info("Worker started");
            var start = moment.valueOf();
            for (;;) {
                var delta = moment().valueOf() - start;
                var timeout = delta < 1000 ? delta : 1000;
                if (1000 === timeout) {
                    queue = filter(queue, function(el) {
                        el.ttl -= 1000;
                        if (el.ttl <= 0) {
                            logger.info("Sending response ...");
                            el.resp.send("Hi from server!");
                            logger.info("Response sent");
                            return false;
                        }
                        return true;
                    });
                }
                var msg = chan.receive(timeout);
                if (!isNil(msg)) {
                    if (!isNil(msg.poisoned)) {
                        logger.info("Stopping worker ...");
                        forEach(queue, function(el) {
                            el.resp.send("Server shutdown!");
                        });
                        break;
                    }
                    if (!isNumber(msg.ttl) || !isNumber(msg.handle)) {
                        logger.error("Invalid message received: [" + JSON.stringify(msg, null, 4) + "]");
                    }
                    var el = {
                        ttl: msg.ttl,
                        resp: new DelayedResponse(msg.handle)
                    };
                    logger.info("Message received");
                    queue.push(el);
                }
            }
            logger.info("Worker stopped");
        }
    };
});
