
define(["wilton/httpClient"], function(httpClient) {
    "use strict";
    return {
        main: function() {
            var resp = httpClient.sendRequest("https://ya.ru");
            print(resp.data);
        }
    };
});
