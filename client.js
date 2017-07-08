
define(["wilton/httpClient"], function(httpClient) {
    return {
        main: function() {
            var resp = httpClient.sendRequest("https://ya.ru");
            print(resp.data);
        }
    };
});
