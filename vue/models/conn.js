
define([
    "wilton/DBConnection",
    "../conf"
], function(DBConnection, conf) {
    "use strict";
    
    // create and return "thread-local" connection
    return new DBConnection(conf.dbUrl);

});
