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
    "module",
    "wilton/Logger",
    "../conf",
    "../db",
    "../models/user"
], function(module, Logger, conf, db, user) {
    "use strict";
    var logger = new Logger(module.id);

    return {
        GET: function(req) {
            var page = parseInt(req.query("page", "1"), 10);
            var sortval = req.query("sortval", "");
            var sortdir = req.query("sortdir", "");
            var nick = req.query("nick", "");
            var email = req.query("email", "");

            var loaded = db.doInSyncTransaction(conf.dbUrl, function() {
                var users = user.load({
                    nick: nick,
                    email: email,
                    limit: conf.tablePageSize,
                    offset: (page - 1) * conf.tablePageSize,
                    sortval: sortval,
                    sortdir: sortdir
                });
                var count = user.count({
                    nick: nick,
                    email: email
                });
                return {
                    users: users,
                    count: count
                };
            });

            req.sendResponse(loaded);
        }
    };
});
