
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
            return conn.doInTransaction(bind(function() {
                return this._idInternal();
            }, this));
        },

        save: function(user) {
            user.spam = user.spam ? 1 : 0;
            user.dateAdded = moment().format();
            conn.doInTransaction(function() {
                conn.execute(qrs.insert, user);
            });
        },

        loadById: function(id) {
            var rec = conn.queryObject(qrs.selectById, {
                id: id
            });
            // no real booleans in sqlite
            rec.spam = 1 === rec.spam;
        },

        load: function(params) {
            var pars = utils.defaultObject(params);
            utils.checkProperties(pars, ["page", "qty"]);
            var limit = pars.qty;
            var offset = (pars.page - 1) * limit;
            // delete pars.page;
            var sql = template(qrs.select)({
                limit: parseInt(limit, 10),
                offset: parseInt(offset, 10)
            });
            var list = conn.queryList(sql);
            return map(list, function(rec) {
                // no real booleans in sqlite
                rec.spam = 1 === rec.spam;
                rec.dateAdded = moment(rec.dateAdded).format('YYYY-MM-DD HH:mm:ss');
                return rec;
            });
        },

        count: function() {
            var rec = conn.queryObject(qrs.count);
            return rec.count;
        },

        insertDummyRecords: function() {
            var count = 64;
            logger.info("Inserting dummy records, count: [" + count + "]");
            conn.doInTransaction(bind(function() {
                for (var i = 0; i < count; i++) {
                    var user = {
                        id: this._idInternal(),
                        dateAdded: moment().format(),
                        nick: "Somename" + i,
                        email: "some" + i + "@email.com",
                        spam: (0 === i) % 3 ? 0 : 1
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
