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
    var Vuex = require("vuex");
    var storeHolder = require("vue-require/store/storeHolder");

    Vue.use(Vuex);

    var res = new Vuex.Store({
        strict: true,

        actions: {
            subscribeForNotifications: require("./common/actions/subscribeForNotifications")
        },

        modules: {
            greetings: require("./modules/greetings/greetingsStore"),
            step1: require("./modules/step1/step1Store"),
            step2: require("./modules/step2/step2Store"),
            step3: require("./modules/step3/step3Store")
        },

        mutations: {
            updateCanGoBack: require("./common/mutations/updateCanGoBack"),
            updateCanGoForward: require("./common/mutations/updateCanGoForward")
        },

        state: {
        }
    });

    storeHolder.set(res);

    return res;
});