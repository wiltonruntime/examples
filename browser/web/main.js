
// top level define required because enforceDefine is used

define([], function() {

    // requirejs config, adjust as needed
    requirejs.config({
        baseUrl: "/stdlib/",
        enforceDefine: true,
        nodeIdCompat: true,
        waitSeconds: 15,
        paths: {
            "web": "/web"
        },
        // these plugins are used to load wilton-packages.json
        packages: [
            { name: "text", main: "text"},
            { name: "json", main: "json"}
        ]
    });

    // load packages config and compat globals
    require(["json!wilton-requirejs/wilton-packages.json",
            "wilton-requirejs/compatGlobals"], function(packages) {
        
        // complete config
        requirejs.config({
            packages: packages
        });

        // preload compat buffer
        require(["buffer"], function(buffer) {

            // set global compat Buffer
            Buffer = buffer.Buffer;


            // app initialiation logic, adjust ad needed

            // run sanity
//            /*
            require(["web/sanity"], function() {
                document.write("SUCCESS");
                console.log("test: sanity");
            });
//            */

            // run tests, baseUrl must point to unpackaged stdlib
            /*
            print = function(msg) {
//                console.log(msg);
                testsCount += 1;
                if (0 === testsCount % 100) {
                    console.log("test: passed " + testsCount);
                }
            };
            var testsCount = 0;
            require(["web/tests"], function() {
                document.write("SUCCESS");
                console.log("Success, tests run: [" + testsCount + "], some async tests are still running");
            });
            */

        });
    });
});
