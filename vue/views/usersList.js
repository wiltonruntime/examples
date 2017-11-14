
define([
    "module",
    "wilton/DBConnection",
    "wilton/utils",
    "wilton/Logger",
    "../conf",
    "../models/user"
], function(module, DBConnection, utils, Logger, conf, user, LeftMenu, Pagination) {
    "use strict";
    var logger = new Logger(module.id);

    var postgres = new DBConnection("postgresql://host=127.0.0.1 port=5432 dbname=postgres user=postgres password=1234");

    return {
        GET: function(req) {

            logger.info(req.meta().queries);
            var qrs = req.meta().queries;
            var showAll = qrs.hasOwnProperty("showAll") ? qrs.showAll == "true" : false;
            var page = qrs.hasOwnProperty("page") ? parseInt(qrs.page, 10) : 1;
            var qty = qrs.hasOwnProperty("qty") ? parseInt(qrs.qty, 10) : 10;
            var search = qrs.hasOwnProperty("search") ? qrs.search : "none";
            var response;
            if (showAll && search == "none") {
                var users = postgres.queryList("select * from drivers");
                
                response = {
                    page_qty: 1,
                    users: users,
                };
            } else if (!showAll && search == "none") {
                var limit = qty;
                var offset = limit * (page - 1);
                var count = postgres.queryList("select count(1) from drivers");
                count = Math.ceil(parseInt(count[0].count) / qty);
                logger.info(postgres.queryList("select count(1) from drivers"));

                var users = postgres.queryList("select * from drivers order by number_1 desc limit :limit offset :offset", {
                    limit: limit,
                    offset: offset
                });
                response = {
                    page_qty: count,
                    users: users,
                };
            } else {
                var searchString = qrs.search.split(" ");

                switch (searchString.length) {
                    case 1: users = postgres.queryList("select * from drivers where firstname like :string0 or lastname like :string0 or primaryname like :string0", {
                            string0: "%" + searchString[0] + "%"});
                        break;
                    case 2: users = postgres.queryList("select * from drivers where firstname like :string0 or lastname like :string0 or primaryname like :string0 or firstname like :string1 or lastname like :string1 or primaryname like :string1", {
                            string0: "%" + searchString[0] + "%",
                            string1: "%" + searchString[1] + "%"});
                        break;
                    case 3: users = postgres.queryList("select * from drivers where firstname like :string0 or lastname like :string0 or primaryname like :string0 or firstname like :string1 or lastname like :string1 or primaryname like :string1 or firstname like :string2 or lastname like :string2 or primaryname like :string2", {
                            string0: "%" + searchString[0] + "%",
                            string1: "%" + searchString[1] + "%",
                            string2: "%" + searchString[2] + "%"});
                        break;        
                };
                response = {
                    page_qty: 1,
                    users: users,
                };
            };

            req.sendResponse(response);
        }
    };
});
