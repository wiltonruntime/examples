
define([
    "module"
], function(module) {
    "use strict";

    return function(caller) {
        print("Hello from: [" + module.id + "] and [" + caller + "]");
    };
});
