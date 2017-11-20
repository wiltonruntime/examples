
define([
    "module",
    "wilton/utils",
    "lodash/map",
    "wilton/Channel",
    "wilton/Logger",
    "../conf",
    "../models/user"
], function(module, utils, map, Channel, Logger, conf, user, LeftMenu, Pagination) {
    "use strict";
    var logger = new Logger(module.id);

    return {
        GET: function(req) {

            logger.info(req.meta().queries);
            utils.checkProperties(req.meta().queries, ["page"]);
            var qrs = req.meta().queries;
            var qty = conf.usersQtyPerPage;

            var page = qrs.hasOwnProperty("page") ? parseInt(qrs.page, 10) : 1;

            var sortType = qrs.hasOwnProperty("sortType") ? qrs.sortType : "id";
            var sortDirection = qrs.hasOwnProperty("sortDirection") ? qrs.sortDirection : "down";
            var search = qrs.hasOwnProperty("search") ? qrs.search.split(" ") : [];
    
            var users = user.load({
                page: page,
                qty: qty,
                sortType: sortType,
                sortDirection: sortDirection,
                search: search
            });
            var count = Math.ceil(user.count() / qty);

            var response = {
                page_qty: count,
                users: users,
            };

            req.sendResponse(response);
        }
    };
});
