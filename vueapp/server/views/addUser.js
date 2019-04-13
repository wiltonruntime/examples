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
    // modules
    "module",
    "lodash/isBoolean",
    "lodash/isEmpty",
    "lodash/isString",
    "validator/lib/isEmail",
    "wilton/Logger",
    // local
    "../conf",
    "../db",
    "../models/user"
], function(
        module, isBoolean, isEmpty, isString, isEmail, Logger, // modules
        conf, db, user // local
) {
    "use strict";
    var logger = new Logger(module.id);

    return {
        POST: function(req) {
            var errors = {};
            var form = req.json();
            if (!isString(form.email) || isEmpty(form.email) || !isEmail(form.email)) {
                errors.email = "Invalid email address";
            }
            if (!isString(form.nick) || isEmpty(form.nick)) {
                errors.nick = "Entered nickname is empty";
            }
            if (!isBoolean(form.spam)) {
                errors.spam = "Spam flag not set";
            }
            if (!isEmpty(errors)) {
                req.sendResponse({
                    errors: errors
                }, {
                    meta: {
                        statusCode: 400,
                        statusMessage: "Bad Request"
                    }
                });
            } else {
                logger.info("Saving user: [" + JSON.stringify(form, null, 4) + "]");
                db.doInSyncTransaction(conf.dbUrl, function() {
                    form.id = user.id();
                    user.save(form);
                });
            }
        }
    };
});
