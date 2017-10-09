
define([
    "module",
    "./_leftMenuItems"
], function(module, leftMenuItems) {
    return {
        GET: function(req) {
            req.sendMustache(module.uri, {
                leftMenuItems: leftMenuItems("addUser")
            });
        }
    };
});
