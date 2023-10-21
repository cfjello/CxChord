///<reference types="../node_modules/@types/chart.js/index.d.ts" />
import { Chart } from "chart.js";

export class BarDataSet {

    _options: Chart.ChartOptions = {
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

    _options2 = {
        scaleBeginAtZero: true,
        scaleShowGridLines: true,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        barShowStroke: true,
        barStrokeWidth: 2,
        barValueSpacing: 5,
        barDatasetSpacing: 1,
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    }

    barData = { // LinearChartData
        labels:   [] as string[],    // e.g. ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [] as any[]
    }

    constructor(public labels: string[]) { 
            this.setLabels(labels)
            this.barData.labels = labels
    }

    componentToHex(c: string) {
        let num = parseInt(c)
        var hex = num.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      }
      
    rgbToHex(rgb: string) {
        let [red, green, blue] = rgb.split(',')
        return "#" + this.componentToHex(red) + this.componentToHex(green) + this.componentToHex(blue);
      }

    setLabels(labels: string[]) {
        this.labels = labels
    }

    addDataSet(label: string, rgb: string, data: number[]) {
        const len = data.length
        const bgColors: string[] = []
        for ( let i = 0; i < len; i++  ) {
            bgColors.push(this.rgbToHex(rgb))
        }
        this.barData.datasets.push(
            {
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
            }
        )
       // console.debug(JSON.stringify(this.barData.datasets[this.barData.datasets.length -1]))
    }
}

export class BayesChart extends BarDataSet {

    canvas: HTMLCanvasElement
    ctx: any
    barChart: any

    constructor(htmlElement: string = 'visualization', labels: string[] = []) {
        super(labels)
        try {
            document.getElementById(htmlElement)!.innerHTML = '&nbsp;';
            this.canvas = <HTMLCanvasElement>document.getElementById(htmlElement)
            this.ctx = this.canvas.getContext('2d')
        }
        catch(e) {
            console.warn("\nBayesChart: No Visualization HtmlElement " + htmlElement  + " found (OK if not in a browser).")
        }
    }

    showChart() {
        try {
            const conf: Chart.ChartConfiguration = {}
            this.barChart = new Chart(this.ctx, {
                type: 'bar',
                data: this.barData,
                options: this._options
            })
            document.getElementById('legend')!.innerHTML = this.barChart.generateLegend();
        }
        catch(e) {
            console.warn("\nBayesChart.showChart: Failed to show Chart element (OK if not in a browser).")
        }
    }
}
