
define([
    "binmod/hello"
], function(hello) {
    "use strict";

    return {
        main: function() {
            hello();
        }
    };
});
