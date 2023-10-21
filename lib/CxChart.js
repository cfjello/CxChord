"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BayesChart = exports.BarDataSet = void 0;
///<reference types="../node_modules/@types/chart.js/index.d.ts" />
var chart_js_1 = require("chart.js");
var BarDataSet = /** @class */ (function () {
    function BarDataSet(labels) {
        this.labels = labels;
        this._options = {
            scales: {
                xAxes: [{
                    // categorySpacing: 1
                    // barPercentage: 0.5
                    }],
                yAxes: [{
                        type: "linear",
                        display: true,
                        position: "left",
                        id: "y-axis-1",
                        // ticks: {
                        //     beginAtZero: true
                        // }
                    }]
            },
            responsive: true,
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Top Hypothesis'
            }
        };
        this._options2 = {
            scaleBeginAtZero: true,
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            barShowStroke: true,
            barStrokeWidth: 2,
            barValueSpacing: 5,
            barDatasetSpacing: 1,
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
        };
        this.barData = {
            labels: [],
            datasets: []
        };
        this.setLabels(labels);
        this.barData.labels = labels;
    }
    BarDataSet.prototype.componentToHex = function (c) {
        var num = parseInt(c);
        var hex = num.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    };
    BarDataSet.prototype.rgbToHex = function (rgb) {
        var _a = rgb.split(','), red = _a[0], green = _a[1], blue = _a[2];
        return "#" + this.componentToHex(red) + this.componentToHex(green) + this.componentToHex(blue);
    };
    BarDataSet.prototype.setLabels = function (labels) {
        this.labels = labels;
    };
    BarDataSet.prototype.addDataSet = function (label, rgb, data) {
        var len = data.length;
        var bgColors = [];
        for (var i = 0; i < len; i++) {
            bgColors.push(this.rgbToHex(rgb));
        }
        this.barData.datasets.push({
            label: label,
            backgroundColor: bgColors,
            borderColor: bgColors,
            // hoverBackgroundColor: bgColors,
            // fillColor: "rgba(" + rgb + ",0.5)",
            // strokeColor: "rgba(" + rgb + ",0.8)",
            // highlightFill: "rgba(" + rgb + ",0.75)",
            // highlightStroke: "rgba(" + rgb + ",1)",
            // pointBorderWidth: 1.5,
            // tension: -1,
            // yAxisID: "y-axis-1",
            data: data
        });
        // console.debug(JSON.stringify(this.barData.datasets[this.barData.datasets.length -1]))
    };
    return BarDataSet;
}());
exports.BarDataSet = BarDataSet;
var BayesChart = /** @class */ (function (_super) {
    __extends(BayesChart, _super);
    function BayesChart(htmlElement, labels) {
        if (htmlElement === void 0) { htmlElement = 'visualization'; }
        if (labels === void 0) { labels = []; }
        var _this = _super.call(this, labels) || this;
        try {
            document.getElementById(htmlElement).innerHTML = '&nbsp;';
            _this.canvas = document.getElementById(htmlElement);
            _this.ctx = _this.canvas.getContext('2d');
        }
        catch (e) {
            console.warn("\nBayesChart: No Visualization HtmlElement " + htmlElement + " found (OK if not in a browser).");
        }
        return _this;
    }
    BayesChart.prototype.showChart = function () {
        try {
            var conf = {};
            this.barChart = new chart_js_1.Chart(this.ctx, {
                type: 'bar',
                data: this.barData,
                options: this._options
            });
            document.getElementById('legend').innerHTML = this.barChart.generateLegend();
        }
        catch (e) {
            console.warn("\nBayesChart.showChart: Failed to show Chart element (OK if not in a browser).");
        }
    };
    return BayesChart;
}(BarDataSet));
exports.BayesChart = BayesChart;
