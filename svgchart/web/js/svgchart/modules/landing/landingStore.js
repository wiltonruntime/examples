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

    return {
        namespaced: true,

        actions: {
            exportPdf: require("./actions/exportPdf")
        },

        mutations: {
            appendDatasetPointFromSrc: require("./mutations/appendDatasetPointFromSrc")
        },

        state: {
            chart: {
                xAxis: {
                    min: 0,
                    max: 16,
                    step: 2
                },

                yAxis: {
                    min: 16,
                    max: 32,
                    step: 4
                },

                datasetSrc: [
                    {x: 0, y: 17},
                    {x: 2, y: 23},
                    {x: 4, y: 25},
                    {x: 6, y: 21},
                    {x: 8, y: 22},
                    {x: 10, y: 29},
                    {x: 12, y: 31},
                    {x: 14, y: 25},
                    {x: 16, y: 23}
                ],

                dataset: [
                ]
            }
        }
    };
});
