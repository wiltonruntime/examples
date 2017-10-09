
define([
    "lodash/forEach",
    "wilton/utils"
], function(forEach, utils) {
    var LINK_PREFIX = "/bootstrap/views/";

    var ITEMS = [{
        id: "description",
        text: "Description"
    }, {
        id: "addUser",
        text: "Add User"
    }, {
        id: "usersList",
        text: "Users List"
    }, {
        id: "aboutWilton",
        text: "About Wilton"
    }];

    return function(active) {
        var res = utils.cloneObject(ITEMS);
        forEach(res, function(el) {
            if (active === el.id) {
                el.active = true;
            }
            el.link = LINK_PREFIX + el.id;
        });
        return res;
    };
});
