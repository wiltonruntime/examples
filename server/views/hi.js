
define([], function() {
    return {
        GET: function(req) {
            var meta = req.getMetadata();
            req.sendResponse({
                msg: "hello from GET handler",
                inputData: meta.queries
            });
        },

        POST: function(req) {
            req.sendResponse({
                msg: "hello from POST handler",
                inputData: req.getData()
            });
        }
    };
});
