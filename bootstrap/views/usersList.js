
define([
    "module",
    "../models/user",
    "./_leftMenuItems"
], function(module, user, leftMenuItems) {
    return {
        GET: function(req) {
            var users = user.loadAll();
            req.sendMustache(module.uri, {
                leftMenuItems: leftMenuItems("usersList"),
                users: users
            });
        }
    };
});
