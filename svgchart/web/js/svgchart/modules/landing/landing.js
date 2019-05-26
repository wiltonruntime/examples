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

define([
    "module",
    // lodash
    "lodash/bind",
    "lodash/forEach",
    "lodash/join",
    "lodash/map",
    // vue-require
    "vue-require/store/commit",
    "vue-require/store/dispatch",
    "vue-require/store/state",
    // local
    "text!./landing.html"
], function (
        module, 
        bind, forEach, join, map, //lodash
        commit, dispatch, state, // vue-require
        template // local
) {
    "use strict";

    return {
        template: template,

        computed: {
 
            chartWidth: function() {
                return 800;
            },
 
            chartHeight: function() {
                return 320;
            },

            paddingSizePixels: function() {
                return 30;
            },

            borderColor: function() {
                return "#e0e0e0";
            },

            gridColor: function() {
                return "#999999";
            },

            gridDashRatio: function() {
                return "5,10";
            },

            pointColor: function() {
                return "#777777";
            },

            polygonColor: function() {
                return "#cccccc";
            },

            pointOuterRadiusPixels: function() {
                return 6;
            },

            pointInnerRadiusPixels: function() {
                return 3;
            },

            verticalGridLines: function() {
                var res = [];
                var step = state(module).chart.xAxis.step;
                var min = state(module).chart.xAxis.min;
                var max = state(module).chart.xAxis.max;
                var xPixels = (this.chartWidth - (this.paddingSizePixels * 2))/(max - min);
                for (var i = 0; i <= max; i += step) {
                    res.push({
                        x1: this.paddingSizePixels + (xPixels * i),
                        y1: this.chartHeight - this.paddingSizePixels,
                        x2: this.paddingSizePixels + (xPixels * i),
                        y2: this.paddingSizePixels,
                        label: String(min + i),
                        labelX: (i * xPixels) + (this.paddingSizePixels * 0.8),
                        labelY: this.chartHeight - (this.paddingSizePixels * 0.3)
                    });
                }
                return res;
            },

            horisontalGridLines: function() {
                var res = [];
                var step = state(module).chart.yAxis.step;
                var min = state(module).chart.yAxis.min;
                var max = state(module).chart.yAxis.max;
                var yPixels = (this.chartHeight - (this.paddingSizePixels * 2))/(max - min);
                for (var i = 0; i <= max; i += step) {
                    res.push({
                        x1: this.paddingSizePixels,
                        y1: this.chartHeight - (this.paddingSizePixels + (yPixels * i)),
                        x2: this.chartWidth - this.paddingSizePixels,
                        y2: this.chartHeight - (this.paddingSizePixels + (yPixels * i)),
                        label: String(min + i),
                        labelX: (this.paddingSizePixels * 0.3),
                        labelY: this.chartHeight - ((i * yPixels) + (this.paddingSizePixels * 0.8))
                    });
                }
                return res;
            },

            datasetCoords: function() {
                var xMin = state(module).chart.xAxis.min;
                var xMax = state(module).chart.xAxis.max;
                var xPixels = (this.chartWidth - (this.paddingSizePixels * 2))/(xMax - xMin);
                var yMin = state(module).chart.yAxis.min;
                var yMax = state(module).chart.yAxis.max;
                var yPixels = (this.chartHeight - (this.paddingSizePixels * 2))/(yMax - yMin);
                return map(state(module).chart.dataset, bind(function(dt) {
                    return {
                        x: this.paddingSizePixels + (xPixels * (dt.x - xMin)),
                        y: this.chartHeight - (this.paddingSizePixels + (yPixels * (dt.y - yMin)))
                    };
                }, this));
            },

            polygonCoords: function() {
                var dataset = state(module).chart.dataset;
                if (dataset.length < 2) {
                    return [];
                }
                var xMin = state(module).chart.xAxis.min;
                var xMax = state(module).chart.xAxis.max;
                var xPixels = (this.chartWidth - (this.paddingSizePixels * 2))/(xMax - xMin);
                var bottomLeft = {
                    x: this.paddingSizePixels + (xPixels * (dataset[0].x - xMin)),
                    y: this.chartHeight - this.paddingSizePixels
                };
                var bottomRight = {
                    x: this.paddingSizePixels + (xPixels * (dataset[dataset.length - 1].x - xMin)),
                    y: this.chartHeight - this.paddingSizePixels
                };
                var list = [bottomLeft];
                forEach(this.datasetCoords, function(dt) {
                    list.push(dt);
                });
                list.push(bottomRight);
                var coords = map(list, function(dt) {
                    return String(dt.x) + "," + String(dt.y);
                });
                return join(coords, " ");
            }
        },

        methods: {
            addButtonPressed: function() {
                commit("landing/appendDatasetPointFromSrc");
            },

            exportPdf: function() {
                var svg = document.getElementById("svgChart");
                var url = new XMLSerializer().serializeToString(svg);
                var canvas = document.getElementById("svgCanvas");
                var ctxt = canvas.getContext("2d");
                var img = new Image();
                img.onload = function() {
                    ctxt.drawImage(this, 0, 0);
                    var data = canvas.toDataURL();
                    dispatch("landing/exportPdf", data);
                };
                img.src = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(url);
            }
        }
    };
});


