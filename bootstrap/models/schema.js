
define([
    "module",
    "wilton/DBConnection",
    "wilton/loader",
    "wilton/Logger",
    "wilton/shared"
], function(module, DBConnection, loader, Logger, shared) {
    var logger = new Logger(module.id);
    
    return {
        create: function() {
            var conf = shared.get("bootstrap/conf");
            var conn = new DBConnection(conf.dbUrl);
            var sqlPath = loader.findModulePath(module.id + ".sql");
            try {
                logger.info("Creating DB schema ...");
                var count = conn.executeFile(sqlPath);
                logger.info("DB schema created, statements executed: [" + count + "]");
            } finally {
                conn.close();
            }
        }
    };
});
