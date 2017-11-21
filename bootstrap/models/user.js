
define([
    "module",
    "lodash/bind",
    "lodash/map",
    "lodash/template",
    "moment",
    "wilton/DBConnection",
    "wilton/loader",
    "wilton/Logger",
    "../conf",
    "../db"
], function(module, bind, map, template, moment, DBConnection, loader, Logger, conf, db) {
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
            return rec.count;
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
