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
    // modules
    "module",
    "lodash/bind",
    "lodash/map",
    "moment",
    // wilton
    "wilton/DBConnection",
    "wilton/loader",
    "wilton/Logger",
    // local
    "../conf",
    "../db"
], function(
        module, bind, map, moment, // modules
        DBConnection, loader, Logger, // wilton
        conf, db // local
) {
    "use strict";
    
    var logger = new Logger(module.id);
    var queriesPath = loader.findModulePath(module.id + ".sql");
    var qrs = DBConnection.loadQueryFile(queriesPath);

    return {
        id: function() {
            db.execute(qrs.idUpdate);
            var obj = db.queryObject(qrs.idSelect);
            return obj.id;
        },

        save: function(user) {
            user.spam = user.spam ? 1 : 0;
            user.dateAdded = moment().format();
            db.execute(qrs.insert, user);
        },

        load: function(params) {
            var list = db.queryList(qrs.select, params);
            return map(list, bind(function(rec) {
                // no real booleans in sqlite
                rec.spam = 1 === rec.spam;
                rec.dateAdded = moment(rec.dateAdded).format('YYYY-MM-DD HH:mm:ss');
                return rec;
            }, this));
        },

        count: function(params) {
            var rec = db.queryObject(qrs.count, params);
            return parseInt(rec.count, 10);
        },

        insertDummyRecords: function() {
            var count = 99;
            logger.info("Inserting dummy records, count: [" + (count - 10) + "]");
            for (var i = 10; i < count; i++) {
                var user = {
                    id: this.id(),
                    dateAdded: moment().add(i % 2 ? i : -i, 'days').format(),
                    nick: "a" + i + "SomeNick",
                    email: "some" + (count - i) + "@email.com",
                    spam: 0 === i % 3 ? 0 : 1
                };
                db.execute(qrs.insert, user);
            }
        }
    };
});
