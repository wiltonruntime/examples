
define([
    "module",
    "wilton/loader",
    "wilton/Logger",
    "./conn"
], function(module, loader, Logger, conn) {
    var logger = new Logger(module.id);
    
    return {
        create: function() {
            var sqlPath = loader.findModulePath(module.id + ".sql");
            logger.info("Creating DB schema ...");
            var count = conn.executeFile(sqlPath);
            logger.info("DB schema created, statements executed: [" + count + "]");
        }
    };
});
