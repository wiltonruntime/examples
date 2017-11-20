
define([
    "module",
    "lodash/isEmpty",
    "validator/lib/isEmail",
    "moment",
    "wilton/Logger",
    "../conf",
    "../models/user"
], function(module, isEmpty, isEmail, moment, Logger, conf, user) {
    "use strict";
    var logger = new Logger(module.id);

    return {
        POST: function(req) {
            var form = req.queries();
            var errors = {};
            if (!isEmail(form.email)) {
                errors.email = "Invalid email address";
            }
            if (!isEmpty(errors)) {
                req.sendResponse(errors);
            } else {
                form.id = user.id();
                form.spam = form.hasOwnProperty("spam") ? form.spam : 0;
                form.lastname = form.hasOwnProperty("lastname") ? form.lastname : "No lastname";
                form.firstname = form.hasOwnProperty("firstname") ? form.firstname : "No firstname";
                form.primaryname = form.hasOwnProperty("primaryname") ? form.primaryname : "No primaryname";
                logger.info(form.birthday);
                logger.info(form.hasOwnProperty("birthday"));
                logger.info("Saving user: [" + JSON.stringify(form, null, 4) + "]");
                user.save(form);
                req.sendResponse("User added");
            }
            logger.info(form);
        }
    };
});
