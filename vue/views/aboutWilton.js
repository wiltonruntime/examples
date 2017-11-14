
define([
    "module",
    "../conf",
    "../components/LeftMenu"
], function(module, conf, LeftMenu) {
    "use strict";

    var leftMenu = new LeftMenu(conf.leftMenu);

    return {
        GET: function(req) {
            req.sendMustache(module.uri, {
                leftMenuItems: leftMenu.items("aboutWilton")
            });
        }
    };
});
