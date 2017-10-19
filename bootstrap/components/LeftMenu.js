
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
