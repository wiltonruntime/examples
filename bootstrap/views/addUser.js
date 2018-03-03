/*
 * Copyright 2017, alex at staticlibs.net
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define([
    "module",
    "lodash/isEmpty",
    "validator/lib/isEmail",
    "wilton/Logger",
    "../conf",
    "../db",
    "../components/LeftMenu",
    "../models/user"
], function(module, isEmpty, isEmail, Logger, conf, db, LeftMenu, user) {
    "use strict";
    var logger = new Logger(module.id);

    var leftMenu = new LeftMenu(conf.leftMenu);

    return {
        GET: function(req) {
            req.sendMustache(module.uri, {
                leftMenuItems: leftMenu.items("addUser")
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
                    leftMenuItems: leftMenu.items("addUser"),
                    form: form,
                    errors: errors
                });
            } else {
                form.spam = form.hasOwnProperty("spam");
                logger.info("Saving user: [" + JSON.stringify(form, null, 4) + "]");
                db.doInSyncTransaction(conf.dbUrl, function() {
                    form.id = user.id();
                    user.save(form);
                });
                req.sendRedirect("/bootstrap/views/usersList");
            }
        }
    };
});
