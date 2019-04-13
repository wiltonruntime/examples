/*
 * Copyright 2019, alex at staticlibs.net
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

define(function(require) {
    "use strict";

    var Vue = require("vue");
    var VueRouter = require("vue-router");
    var routerHolder = require("vue-require/router/routerHolder");

    Vue.use(VueRouter);

    var res = new VueRouter({
        linkActiveClass: "active",
        linkExactActiveClass: "active",
        routes: [
            { path: "/", component: require("./modules/greetings/greetings") },
            { path: "/step1", component: require("./modules/step1/step1") },
            { path: "/step2", component: require("./modules/step2/step2") },
            { path: "/step3", component: require("./modules/step3/step3") }
        ]
    });

    routerHolder.set(res);

    return res;
});