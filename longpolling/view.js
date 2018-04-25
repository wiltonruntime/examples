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
    "module",
    "wilton/Channel",
    "wilton/Logger",
    "wilton/wiltoncall"
], function(module, Channel, Logger, wiltoncall) {
    "use strict";
    
    var logger = new Logger(module.id);
    var chan = Channel.lookup("receiveChannel");

    return {
        GET: function(req) {
            logger.info("Receiving request ...");
            var handle = req.sendResponseLater();
            logger.info("Enqueing request ...");
            chan.send({
                handle: handle,
                ttl: 30000
            });
            logger.info("Request enqueued");
        }
    };
});
