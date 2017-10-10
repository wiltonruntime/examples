
define([
    "module",
    "lodash/map",
    "wilton/DBConnection",
    "wilton/loader",
    "wilton/Logger",
    "wilton/shared"
], function(module, map, DBConnection, loader, Logger, shared) {
    var logger = new Logger(module.id);
    var conf = shared.get("bootstrap/conf");
    var conn = new DBConnection(conf.dbUrl);
    var queriesPath = loader.findModulePath(module.id + ".sql");
    var qrs = DBConnection.loadQueryFile(queriesPath);

    return {
        id: function() {
            return conn.doInTransaction(function() {
                conn.execute(qrs.userIdUpdate);
                var obj = conn.queryObject(qrs.userIdSelect);
                return obj.id;
            });
        },

        save: function(user) {
            user.spam = user.spam ? 1 : 0;
            conn.doInTransaction(function() {
                conn.execute(qrs.userInsert, user);
            });
        },

        load: function(id) {
            var rec = conn.queryObject(qrs.userSelectById, {
                id: id
            });
            // no real booleans in sqlite
            rec.spam = 1 === rec.spam;
        },

        loadAll: function(params) {
            var list = conn.queryList(qrs.userSelect, params);
            return map(list, function(rec) {
                // no real booleans in sqlite
                rec.spam = 1 === rec.spam;
                return rec;
            });
        }
    };
});
