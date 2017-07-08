
define([], function() {
    return {
        GET: function(req) {
            req.sendResponse({
                msg: "Bye!"
            });
        }
    };
});
