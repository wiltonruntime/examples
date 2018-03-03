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
    "lodash/bind",
    "lodash/cloneDeep",
    "lodash/forEach",
    "wilton/utils"
], function(bind, cloneDeep, forEach, utils) {
    "use strict";

    function LeftMenu(options) {
        utils.checkProperties(options, ["urlPrefix", "items"]);
        this.urlPrefix = options.urlPrefix;
        this.itemTemplates = options.items;
    }

    LeftMenu.prototype = {
        items: function(active) {
            var res = cloneDeep(this.itemTemplates);
            forEach(res, bind(function(el) {
                if (active === el.id) {
                    el.active = true;
                }
                el.link = this.urlPrefix + el.id;
            }, this));
            return res;
        }
    };

    return LeftMenu;
});
