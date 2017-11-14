
define([
    "module",
    "lodash/bind",
    "lodash/map",
    "lodash/template",
    "moment",
    "wilton/DBConnection",
    "wilton/loader",
    "wilton/Logger",
    "wilton/utils",
    "../conf",
    "./conn"
], function(module, bind, map, template, moment, DBConnection, loader, Logger, utils, conf, conn) {
    "use strict";
    var logger = new Logger(module.id);
    var queriesPath = loader.findModulePath(module.id + ".sql");
    var qrs = DBConnection.loadQueryFile(queriesPath);

    return {
        id: function() {
            return conn.doInSyncTransaction(conf.dbUrl, bind(function() {
                return this._idInternal();
            }, this));
        },

        save: function(user) {
            return conn.doInSyncTransaction(conf.dbUrl, bind(function() {
                user.spam = user.spam ? 1 : 0;
                user.dateAdded = moment().format();
                conn.execute(qrs.insert, user);
            }, this));
        },

        loadById: function(id) {
            return conn.doInSyncTransaction(conf.dbUrl, bind(function() {
                var rec = conn.queryObject(qrs.selectById, {
                    id: id
                });
                // no real booleans in sqlite
                rec.spam = 1 === rec.spam;
            }, this));
        },

        load: function(params) {
            return conn.doInSyncTransaction(conf.dbUrl, bind(function() {
                var list = conn.queryList(qrs.select, params);
                return map(list, bind(function(rec) {
                    // no real booleans in sqlite
                    rec.spam = 1 === rec.spam;
                    rec.dateAdded = moment(rec.dateAdded).format('YYYY-MM-DD HH:mm:ss');
                    return rec;
                }, this));
            }, this));
        },

        count: function(params) {
            return conn.doInSyncTransaction(conf.dbUrl, bind(function() {
                var rec = conn.queryObject(qrs.count, params);
                return rec.count;
            }, this));
        },

        insertDummyRecords: function() {
            return conn.doInSyncTransaction(conf.dbUrl, bind(function() {
                var count = 99;
                logger.info("Inserting dummy records, count: [" + (count - 10) + "]");
                for (var i = 10; i < count; i++) {
                    var user = {
                        id: this._idInternal(),
                        dateAdded: moment().add(i % 2 ? i : -i, 'days').format(),
                        nick: "a" + i + "SomeNick",
                        email: "some" + (count - i) + "@email.com",
                        spam: 0 === i % 3 ? 0 : 1
                    };
                    conn.execute(qrs.insert, user);
                }
            }, this));
        },

        _idInternal: function() {
            conn.execute(qrs.idUpdate);
            var obj = conn.queryObject(qrs.idSelect);
            return obj.id;
        }
    };
});
