/*
 * Copyright 2018, alex at staticlibs.net
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define([
    "assert",
    "wilton/web/httpClient"
], function(assert, http) {
    "use strict";

    var url = "http://127.0.0.1:8080/browser/views/httpClientView";

    function assertOk(err, resp) {
        assert.equal(err, null);
        assert.equal(typeof(resp), "object");
        assert.equal(resp.data, "OK");
        assert.equal(resp.responseCode, 200);
    }

    // validation

    assert.throws(function() { http.sendRequest(); });
    assert.throws(function() { http.sendRequest(""); });
    assert.throws(function() { http.sendRequest(url, {
            foo: 42
    }); });
    assert.throws(function() { http.sendRequest(url, {
            data: 42
    }); });
    assert.throws(function() { http.sendRequest(url, {
            data: "",
            meta: {},
            foo: 42
    }); });
    assert.throws(function() { http.sendRequest(url, {
            data: "",
            meta: {
                abortOnResponseError: 42
            }
    }); });
    assert.throws(function() { http.sendRequest(url, {
            data: "",
            meta: {
                abortOnResponseError: true,
                method: "FOO"
            }
    }); });
    assert.throws(function() { http.sendRequest(url, {
            data: "",
            meta: {
                abortOnResponseError: true,
                method: "POST",
                timeoutMillis: -1
            }
    }); });
    assert.throws(function() { http.sendRequest(url, {
            data: "",
            meta: {
                abortOnResponseError: true,
                method: "POST",
                timeoutMillis: 42,
                headers: {
                    foo: 42
                }
            }
    }); });

    // requests

    // normal
    http.sendRequest(url, assertOk);
    http.sendRequest(url, null, assertOk);
    http.sendRequest(url, {
        data: "foo"
    }, function(err, resp) {
        assert.equal(err, null);
        assert.equal(resp.data, "foo");
        assert.equal(resp.headers["Content-Length"], "3");
    });

    // fail on >=400
    console.log("500 is expected 2 times ...");
    http.sendRequest(url, {
        meta: {
            headers: {
                "X-Test-Action": "fail"
            }
        }
    }, function(err, resp) {
        assert.equal(err, "fail");
        assert(resp.data, "failresp");
    });
    http.sendRequest(url, {
        meta: {
            abortOnResponseError: false,
            headers: {
                "X-Test-Action": "fail"
            }
        }
    }, function(err, resp) {
        assert.equal(err, null);
        assert.equal(resp.data, "failresp");
    });

    // json
    http.sendRequest(url, {
        meta: {
            headers: {
                "X-Test-Action": "json"
            }
        }
    }, function(err, resp) {
        assert.equal(err, null);
        assert(typeof(resp.json()), "object");
        assert(resp.json().foo, 42);
    });

    // timeout
    http.sendRequest(url, {
        meta: {
            timeoutMillis: 100,
            headers: {
                "X-Test-Action": "timeout"
            }
        }
    }, function(err, resp) {
        assert(null !== err);
        assert.equal(resp.responseCode, 0);
    });
});
