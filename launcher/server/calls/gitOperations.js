/*
 * Copyright 2019, alex at staticlibs.net
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
    "wilton/fs",
    "wilton/git",
    "wilton/Logger",
    "../conf"
], function(module, fs, git, Logger, conf) {
    "use strict";
    var logger = new Logger(module.id);

    return {
        clone: function(url) {
            logger.info("Cloning Git repository on url: [" + url + "] ...");
            var repo = conf.appdir + "work/app";
            if (fs.exists(repo)) {
                fs.rmdir(repo);
            }
            git.clone(url, repo, {
                sshPublicKeyPath: conf.git.sshPublicKeyPath,
                sshPrivateKeyPath: conf.git.sshPrivateKeyPath
            });
            logger.info("Clone perfomed successfully");
        }
    };
});
