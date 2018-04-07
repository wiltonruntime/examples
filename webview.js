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

// must be run with Rhino or Nashorn engine
define([], function() {
    "use strict";

    var Runnable = Packages.java.lang.Runnable;
    var System = Packages.java.lang.System;
    var SimpleStringProperty = Packages.javafx.beans.property.SimpleStringProperty;
    var Scene = Packages.javafx.scene.Scene;
    var Platform = Packages.javafx.application.Platform;
    var WebView = Packages.javafx.scene.web.WebView;
    var FxApp = Packages.wilton.support.fx.FxApp;

    function webview() {
        var stage = FxApp.STAGE;
        var webView = new WebView();
        webView.getEngine().load("https://yandex.ru/");
        var scene = new Scene(webView);
        stage.setScene(scene);
        var titleProp = new SimpleStringProperty("wilton webview");
        stage.titleProperty().bind(titleProp);
        stage.show();
    }

    return {
        main: function() {
            FxApp.launchApp(new Runnable({run: webview}));
            Platform.exit();
            System.exit(0);
        }
    };

});

