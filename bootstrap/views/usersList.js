
define([
    "module",
    "lodash/template",
    "../conf",
    "../db",
    "../models/user",
    "../components/LeftMenu",
    "../components/pagination"
], function(module, template, conf, db, user, LeftMenu, pagination) {
    "use strict";

    var leftMenu = new LeftMenu(conf.leftMenu);
    var baseUrl = "usersList?${nick}${email}";
    var pageUrlTemplate = template(baseUrl + "${sortval}${sortdir}page=");
    var sortUrlTemplate = template(baseUrl);

    return {
        GET: function(req) {
            var page = parseInt(req.query("page", "1"), 10);
            var sortval = req.query("sortval", "");
            var sortdir = req.query("sortdir", "");
            var nick = req.query("nick", "");
            var email = req.query("email", "");

            var loaded = db.doInSyncTransaction(conf.dbUrl, function() {
                var users = user.load({
                    nick: nick,
                    email: email,
                    limit: conf.tablePageSize,
                    offset: (page - 1) * conf.tablePageSize,
                    sortval: sortval,
                    sortdir: sortdir
                });
                var count = user.count({
                    nick: nick,
                    email: email
                });
                return {
                    users: users,
                    count: count
                };
            });

            // todo: use "qs" module
            var pageUrl = pageUrlTemplate({
                nick: nick ? "nick=" + nick + "&" : "",
                email: email ? "email=" + email + "&" : "",
                sortval: sortval ? "sortval=" + sortval + "&" : "",
                sortdir: sortdir ? "sortdir=" + sortdir + "&" : ""
            });

            var sortUrl = sortUrlTemplate({
                nick: nick ? "nick=" + nick + "&" : "",
                email: email ? "email=" + email + "&" : ""
            });

            var sortArrow = {};
            sortArrow[sortval] = conf.sortArrow[sortdir];

            req.sendMustache(module.uri, {
                nick: nick,
                email: email,
                leftMenuItems: leftMenu.items("usersList"),
                users: loaded.users,
                paginationButtons: pagination(pageUrl, conf.tablePageSize, page, loaded.count),
                sortUrl: sortUrl,
                sortdirInverted: "asc" === sortdir ? "desc" : "asc",
                sortArrow: sortArrow
            });
        }
    };
});
