
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
            utils.checkProperties(pars, ["page", "qty", "sortType", "sortDirection", "search"]);
            var limit = pars.qty;
            var offset = (pars.page - 1) * limit;
            var sortDirection = pars.sortDirection == "down" ? "desc" : "asc";
            var sortType = pars.sortType == "name" ? "lastname" : pars.sortType;
            var search = pars.search;

            // delete pars.page;
            logger.info(search.length);
            if (search.length == 0)
            {
                var sql = template(qrs.select)({
                    limit: parseInt(limit, 10),
                    offset: parseInt(offset, 10),
                    sortType: sortType,
                    sortDirection: sortDirection,
                });
            } else {
                var sql = template(qrs.select)({
                    limit: parseInt(limit, 10),
                    offset: parseInt(offset, 10),
                    sortType: sortType,
                    sortDirection: sortDirection,
                    firstname: search.length >= 1 ? search[0] : null,
                    lastname: search.length >= 2 ? search[1] : null,
                    primaryname: search.length == 3 ? search[2] : null
                });
            };
            
            var list = conn.queryList(sql);
            return map(list, function(rec) {
                // no real booleans in sqlite
                rec.spam = 1 === rec.spam;
                rec.birthday = moment(rec.birthday, "DD-MM-YYYY").format("DD-MM-YYYY");
                return rec;
            });
        },

        count: function() {
            var rec = conn.queryObject(qrs.count);
            return rec.count;
        },

        insertDummyRecords: function() {
            var count = 10000;
            logger.info("Inserting dummy records, count: [" + count + "]");
            conn.doInTransaction(bind(function() {
                for (var i = 0; i < count; i++) {
                    var year = +(Math.floor(Math.random()*(2002 - 1940)) + 1940);
                    var month = +(Math.floor(Math.random()*(12 - 1)) + 1);
                    var day = +(Math.floor(Math.random()*(28 - 1)) + 1);
                    var user = {
                        id: this._idInternal(),
                        birthday: day + "-" +  month + "-" + year,
                        firstname: "Firstname" + i,
                        lastname: "Lastname" + i,
                        primaryname: "Primaryname" + i,
                        email: "some" + i + "@email.com",
                        spam: (0 === i) % 3 ? 0 : 1
                    };
                    conn.execute(qrs.insert, user);
                };
                for (var i = 0; i < 25; i++) {
                    var year = +(Math.floor(Math.random()*(2002 - 1940)) + 1940);
                    var month = +(Math.floor(Math.random()*(12 - 1)) + 1);
                    var day = +(Math.floor(Math.random()*(28 - 1)) + 1);
                    var user = {
                        id: this._idInternal(),
                        birthday: day + "-" +  month + "-" + year,
                        firstname: "Firstname",
                        lastname: "Lastname",
                        primaryname: "Primaryname",
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
