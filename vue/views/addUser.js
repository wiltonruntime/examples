
define([
    "module",
    "lodash/isEmpty",
    "validator/lib/isEmail",
    "wilton/Logger",
    "../conf",
    "../models/user"
], function(module, isEmpty, isEmail, Logger, conf, user) {
    "use strict";
    var logger = new Logger(module.id);

    return {
        POST: function(req) {
            var form = req.queries();
            var errors = {};
            if (!isEmail(form.email)) {
                errors.email = "Invalid email address";
            }
            if (0 === form.nick.length) {
                errors.nick = "Entered nickname is empty";
            }
            if (!isEmpty(errors)) {
                req.sendResponse(errors);
            } else {
                form.id = user.id();
                form.spam = form.hasOwnProperty("spam");
                logger.info("Saving user: [" + JSON.stringify(form, null, 4) + "]");
                user.save(form);
                req.sendResponse("User added");
            }
            logger.info(form);
        }
    };
});
