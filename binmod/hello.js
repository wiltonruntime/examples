
define([
    "module",
    "binmod/dep1"
], function(module, dep1) {
    "use strict";

    return function() {
        dep1(module.id);
    };
});
