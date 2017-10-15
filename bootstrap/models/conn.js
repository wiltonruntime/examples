
define([
    "wilton/DBConnection",
    "../conf"
], function(DBConnection, conf) {
    
    // create and return "thread-local" connection
    return new DBConnection(conf.dbUrl);

});
