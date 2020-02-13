/*
 * Copyright 2020, alex at staticlibs.net
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
    "wilton/crypto",
    "wilton/fs",
    "wilton/zip"
], function(crypto, fs, zip) {
    "use strict";

    return {
        main: function() {
            if (fs.exists("work")) {
                fs.rmdir("work");
            }
            fs.mkdir("work");

            var pars = crypto.createCryptKey("secret");
            crypto.encryptFile({
                filePath: "./src/sanity.txt",
                destFilePath: "./work/sanity.txt",
                cryptKey: pars.cryptKey,
                initVec: pars.initVec
            });
            crypto.encryptFile({
                filePath: "./src/foo.js",
                destFilePath: "./work/foo.js",
                cryptKey: pars.cryptKey,
                initVec: pars.initVec
            });

            zip.writeFile("work/mod.wlib", {
                "sanity.txt": "./work/sanity.txt",
                "foo.js": "./work/foo.js"
            }, {
                fsPaths: true
            });

            print("Encrypted binary module prepared, path: [work/mod.wlib]");
        }
    };
});
