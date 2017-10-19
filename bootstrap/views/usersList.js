
define([
    "module",
    "../conf",
    "../models/user",
    "../components/LeftMenu",
    "../components/Pagination"
], function(module, conf, user, LeftMenu, Pagination) {
    "use strict";

    var leftMenu = new LeftMenu(conf.leftMenu);
    var pagination = new Pagination(conf.paginationUrl, conf.tablePageSize);

    return {
        GET: function(req) {
            var qrs = req.meta().queries;
            var page = qrs.hasOwnProperty("page") ? parseInt(qrs.page, 10) : 1;

            var users = user.load({
                page: page
            });
            var count = user.count();

            req.sendMustache(module.uri, {
                leftMenuItems: leftMenu.items("usersList"),
                users: users,
                paginationButtons: pagination.buttons(page, count)
            });
        }
    };
});
