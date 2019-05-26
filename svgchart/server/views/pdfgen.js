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
    "arrays/StringBuilder",
    "base64-js",
    "wilton/fs",
    "wilton/hex",
    "wilton/Logger",
    "wilton/PDFDocument"
], function(module, StringBuilder, base64, fs, hex, Logger, PDFDocument) {
    "use strict";
    var logger = new Logger(module.id);

    return {
        POST: function(req) {
            logger.debug("Generating PDF ...");

            // prepare and PNG data
            var dataClean = req.data().replace(/^.*,/, "");
            var bytes = base64.toByteArray(dataClean);
            var sb = new StringBuilder();
            for (var i = 0; i < bytes.length; i++) {
                sb.pushCharCode(bytes[i]);
            }
            var pnghex = hex.encodeBytes(sb.toString());

            // generate PDF
            var doc = new PDFDocument();
            doc.addPage({
                format: "A4",
                orientation: "PORTRAIT"
            });
            doc.drawImage({
                imageHex: pnghex,
                imageFormat: "PNG",
                x: 30,
                y: 650,
                width: 400,
                height: 160 
            });
            doc.saveToFile("test.pdf");
            doc.destroy();

            // send PDF file path
            req.sendResponse({
                path: fs.realpath("test.pdf")
            });
        }
    };
});
