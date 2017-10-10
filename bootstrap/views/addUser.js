
define([
    "module",
    "lodash/isEmpty",
    "validator/lib/isEmail",
    "wilton/Logger",
    "../models/user",
    "./_leftMenuItems"
], function(module, isEmpty, isEmail, Logger, user, leftMenuItems) {
    var logger = new Logger(module.id);

    return {
        GET: function(req) {
            req.sendMustache(module.uri, {
                leftMenuItems: leftMenuItems("addUser")
            });
        },

        POST: function(req) {
            var form = req.form();
            var errors = {};
            if (!isEmail(form.email)) {
                errors.email = "Invalid email address";
            }
            if (0 === form.nick.length) {
                errors.nick = "Entered nickname is empty";
            }
            if (!isEmpty(errors)) {
                req.sendMustache(module.uri, {
                    leftMenuItems: leftMenuItems("addUser"),
                    form: form,
                    errors: errors
                });
            } else {
                form.id = user.id();
                form.spam = form.hasOwnProperty("spam");
                logger.info("Saving user: [" + JSON.stringify(form, null, 4) + "]");
                user.save(form);
                req.sendRedirect("/bootstrap/views/usersList");
            }
        }
    };
});
