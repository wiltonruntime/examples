
define([
    "module",
    "wilton/DBConnection",
    "wilton/loader",
    "wilton/Logger",
    "wilton/shared"
], function(module, DBConnection, loader, Logger, shared) {
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
            conn.doInTransaction(function() {
                conn.execute(qrs.userInsert, user);
            });
        },

        load: function(id) {
            return conn.queryObject(qrs.userSelectById, {
                id: id
            });
        },

        loadAll: function(params) {
            return conn.queryList(qrs.userSelect, params);
        }
    };
});
