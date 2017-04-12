/// <reference path="references.d.ts" />
declare namespace CxChord {
    class BarDataSet {
        labels: string[];
        _options: {
            scales: {
                xAxes: {
                    barPercentage: number;
                }[];
                yAxes: {
                    type: string;
                    display: boolean;
                    position: string;
                    id: string;
                }[];
            };
            responsive: boolean;
            legend: {
                display: boolean;
                position: string;
            };
            title: {
                display: boolean;
                text: string;
            };
        };
        _options2: {
            scaleBeginAtZero: boolean;
            scaleShowGridLines: boolean;
            scaleGridLineColor: string;
            scaleGridLineWidth: number;
            barShowStroke: boolean;
            barStrokeWidth: number;
            barValueSpacing: number;
            barDatasetSpacing: number;
            legendTemplate: string;
        };
        barData: LinearChartData;
        constructor(labels: string[]);
        setLabels(labels: string[]): void;
        addDataSet(label: string, rgb: string, data: number[]): void;
    }
    class BayesChart extends BarDataSet {
        canvas: HTMLCanvasElement;
        ctx: any;
        barChart: any;
        constructor(htmlElement?: string, labels?: string[]);
        showChart(): void;
    }
}
