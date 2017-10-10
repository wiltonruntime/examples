
define([
    "module",
    "../models/user",
    "./_leftMenuItems"
], function(module, user, leftMenuItems) {
    return {
        GET: function(req) {
            req.sendMustache(module.uri, {
                leftMenuItems: leftMenuItems("addUser")
            });
        },

        POST: function(req) {
            //todo validate
            /*
            req.sendMustache(module.uri, {
                leftMenuItems: leftMenuItems("addUser"),
                email: {
                    value: "foo@bar.baz",
                    error: req.data()
                }
            });
            */
            var form = req.form();
            form.id = user.id();
            form.spam = form.hasOwnProperty("spam");
            //print(JSON.stringify(form, null, 4));
            user.save(form);
            req.sendRedirect("/bootstrap/views/usersList");
        }
    };
});
