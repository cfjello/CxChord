/// <reference path="references.ts" />


namespace CxChord {

/*
    Chart.defaults.global = {
        animation: true,
        animationSteps: 60,
        animationEasing: "easeOutQuart",
        showScale: true,
        scaleOverride: false,
        scaleSteps: null,
        scaleStepWidth: null,
        scaleStartValue: null,
        scaleLineColor: "rgba(0,0,0,.1)",
        scaleLineWidth: 1,
        scaleShowLabels: true,
        scaleLabel: "<%=value%>",
        scaleIntegersOnly: true,
        scaleBeginAtZero: false,
        scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        scaleFontSize: 12,
        scaleFontStyle: "normal",
        scaleFontColor: "#666",
        responsive: false,
        maintainAspectRatio: true,
        showTooltips: true,
        tooltipEvents: ["mousemove", "touchstart", "touchmove"],
        tooltipFillColor: "rgba(0,0,0,0.8)",
        tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        tooltipFontSize: 14,
        tooltipFontStyle: "normal",
        tooltipFontColor: "#fff",
        tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        tooltipTitleFontSize: 14,
        tooltipTitleFontStyle: "bold",
        tooltipTitleFontColor: "#fff",
        tooltipYPadding: 6,
        tooltipXPadding: 6,
        tooltipCaretSize: 8,
        tooltipCornerRadius: 6,
        tooltipXOffset: 10,
        tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
        multiTooltipTemplate: "<%= value %>",
        onAnimationProgress: function () { },
        onAnimationComplete: function () { }
    }
*/

    export var colorSchema = {
        "Mahogany": { hex: "#CD4A4A",  rgb: "205,74,74" },
        "FuzzyWuzzyBrown": { hex: "#CC6666", rgb: "204,102,102" },
        "Chestnut": { hex: "#BC5D58", rgb: "188,93,88" },
        "RedOrange": { hex: "#FF5349", rgb: "255,83,73" },
        "SunsetOrange": { hex: "#FD5E53", rgb: "253,94,83" },
        "Bittersweet": { hex: "#FD7C6E", rgb: "253,124,110" },
        "Melon": { hex: "#FDBCB4", rgb: "253,188,180" },
        "OutrageousOrange": { hex: "#FF6E4A", rgb: "255,110,74" },
        "VividTangerine": { hex: "#FFA089", rgb: "255,160,137" },
        "BurntSienna": { hex: "#EA7E5D", rgb: "234,126,93" },
        "Brown": { hex: "#B4674D", rgb: "180,103,77" },
        "Sepia": { hex: "#A5694F", rgb: "165,105,79" },
        "Orange": { hex: "#FF7538", rgb: "255,117,56" },
        "BurntOrange": { hex: "#FF7F49", rgb: "255,127,73" },
        "Copper": { hex: "#DD9475", rgb: "221,148,117" },
        "MangoTango": { hex: "#FF8243", rgb: "255,130,67" },
        "AtomicTangerine": { hex: "#FFA474", rgb: "255,164,116" },
        "Beaver": { hex: "#9F8170", rgb: "159,129,112" },
        "AntiqueBrass": { hex: "#CD9575", rgb: "205,149,117" },
        "DesertSand": { hex: "#EFCDB8", rgb: "239,205,184" },
        "RawSienna": { hex: "#D68A59", rgb: "214,138,89" },
        "Tumbleweed": { hex: "#DEAA88", rgb: "222,170,136" },
        "Tan": { hex: "#FAA76C", rgb: "250,167,108" },
        "Peach": { hex: "#FFCFAB", rgb: "255,207,171" },
        "MacaroniandCheese": { hex: "#FFBD88", rgb: "255,189,136" },
        "Apricot": { hex: "#FDD9B5", rgb: "253,217,181" },
        "NeonCarrot": { hex: "#FFA343", rgb: "255,163,67" },
        "Almond": { hex: "#EFDBC5", rgb: "239,219,197" },
        "YellowOrange": { hex: "#FFB653", rgb: "255,182,83" },
        "Gold": { hex: "#E7C697", rgb: "231,198,151" },
        "Shadow": { hex: "#8A795D", rgb: "138,121,93" },
        "BananaMania": { hex: "#FAE7B5", rgb: "250,231,181" },
        "Sunglow": { hex: "#FFCF48", rgb: "255,207,72" },
        "Goldenrod": { hex: "#FCD975", rgb: "252,217,117" },
        "Dandelion": { hex: "#FDDB6D", rgb: "253,219,109" },
        "Yellow": { hex: "#FCE883", rgb: "252,232,131" },
        "GreenYellow": { hex: "#F0E891", rgb: "240,232,145" },
        "SpringGreen": { hex: "#ECEABE", rgb: "236,234,190" },
        "OliveGreen": { hex: "#BAB86C", rgb: "186,184,108" },
        "LaserLemon": { hex: "#FDFC74", rgb: "253,252,116" },
        "UnmellowYellow": { hex: "#FDFC74", rgb: "253,252,116" },
        "Canary": { hex: "#FFFF99", rgb: "255,255,153" },
        "YellowGreen": { hex: "#C5E384", rgb: "197,227,132" },
        "InchWorm": { hex: "#B2EC5D", rgb: "178,236,93" },
        "Asparagus": { hex: "#87A96B", rgb: "135,169,107" },
        "GrannySmithApple": { hex: "#A8E4A0", rgb: "168,228,160" },
        "ElectricLime": { hex: "#1DF914", rgb: "29,249,20" },
        "ScreaminGreen": { hex: "#76FF7A", rgb: "118,255,122" },
        "Fern": { hex: "#71BC78", rgb: "113,188,120" },
        "ForestGreen": { hex: "#6DAE81", rgb: "109,174,129" },
        "SeaGreen": { hex: "#9FE2BF", rgb: "159,226,191" },
        "Green": { hex: "#1CAC78", rgb: "28,172,120" },
        "MountainMeadow": { hex: "#30BA8F", rgb: "48,186,143" },
        "Shamrock": { hex: "#45CEA2", rgb: "69,206,162" },
        "JungleGreen": { hex: "#3BB08F", rgb: "59,176,143" },
        "CaribbeanGreen": { hex: "#1CD3A2", rgb: "28,211,162" },
        "TropicalRainForest": { hex: "#17806D", rgb: "23,128,109" },
        "PineGreen": { hex: "#158078", rgb: "21,128,120" },
        "RobinEggBlue": { hex: "#1FCECB", rgb: "31,206,203" },
        "Aquamarine": { hex: "#78DBE2", rgb: "120,219,226" },
        "TurquoiseBlue": { hex: "#77DDE7", rgb: "119,221,231" },
        "SkyBlue": { hex: "#80DAEB", rgb: "128,218,235" },
        "OuterSpace": { hex: "#414A4C", rgb: "65,74,76" },
        "BlueGreen": { hex: "#199EBD", rgb: "25,158,189" },
        "PacificBlue": { hex: "#1CA9C9", rgb: "28,169,201" },
        "Cerulean": { hex: "#1DACD6", rgb: "29,172,214" },
        "Cornflower": { hex: "#9ACEEB", rgb: "154,206,235" },
        "MidnightBlue": { hex: "#1A4876", rgb: "26,72,118" },
        "NavyBlue": { hex: "#1974D2", rgb: "25,116,210" },
        "Denim": { hex: "#2B6CC4", rgb: "43,108,196" },
        "Blue": { hex: "#1F75FE", rgb: "31,117,254" },
        "Periwinkle": { hex: "#C5D0E6", rgb: "197,208,230" },
        "CadetBlue": { hex: "#B0B7C6", rgb: "176,183,198" },
        "Indigo": { hex: "#5D76CB", rgb: "93,118,203" },
        "WildBlueYonder": { hex: "#A2ADD0", rgb: "162,173,208" },
        "Manatee": { hex: "#979AAA", rgb: "151,154,170" },
        "BlueBell": { hex: "#ADADD6", rgb: "173,173,214" },
        "BlueViolet": { hex: "#7366BD", rgb: "115,102,189" },
        "PurpleHeart": { hex: "#7442C8", rgb: "116,66,200" },
        "RoyalPurple": { hex: "#7851A9", rgb: "120,81,169" },
        "PurpleMountains’Majesty": { hex: "#9D81BA", rgb: "157,129,186" },
        "Violet(Purple)": { hex: "#926EAE", rgb: "146,110,174" },
        "Wisteria": { hex: "#CDA4DE", rgb: "205,164,222" },
        "VividViolet": { hex: "#8F509D", rgb: "143,80,157" },
        "Fuchsia": { hex: "#C364C5", rgb: "195,100,197" },
        "ShockingPink": { hex: "#FB7EFD", rgb: "251,126,253" },
        "PinkFlamingo": { hex: "#FC74FD", rgb: "252,116,253" },
        "Plum": { hex: "#8E4585", rgb: "142,69,133" },
        "HotMagenta": { hex: "#FF1DCE", rgb: "255,29,206" },
        "PurplePizzazz": { hex: "#FF1DCE", rgb: "255,29,206" },
        "RazzleDazzleRose": { hex: "#FF48D0", rgb: "255,72,208" },
        "Orchid": { hex: "#E6A8D7", rgb: "230,168,215" },
        "RedViolet": { hex: "#C0448F", rgb: "192,68,143" },
        "Eggplant": { hex: "#6E5160", rgb: "110,81,96" },
        "Cerise": { hex: "#DD4492", rgb: "221,68,146" },
        "WildStrawberry": { hex: "#FF43A4", rgb: "255,67,164" },
        "Magenta": { hex: "#F664AF", rgb: "246,100,175" },
        "Lavender": { hex: "#FCB4D5", rgb: "252,180,213" },
        "CottonCandy": { hex: "#FFBCD9", rgb: "255,188,217" },
        "VioletRed": { hex: "#F75394", rgb: "247,83,148" },
        "CarnationPink": { hex: "#FFAACC", rgb: "255,170,204" },
        "Razzmatazz": { hex: "#E3256B", rgb: "227,37,107" },
        "PiggyPink": { hex: "#FDD7E4", rgb: "253,215,228" },
        "JazzberryJam": { hex: "#CA3767", rgb: "202,55,103" },
        "Blush": { hex: "#DE5D83", rgb: "222,93,131" },
        "TickleMePink": { hex: "#FC89AC", rgb: "252,137,172" },
        "PinkSherbet": { hex: "#F780A1", rgb: "247,128,161" },
        "Maroon": { hex: "#C8385A", rgb: "200,56,90" },
        "Red": { hex: "#EE204D", rgb: "238,32,77" },
        "RadicalRed": { hex: "#FF496C", rgb: "255,73,108" },
        "Mauvelous": { hex: "#EF98AA", rgb: "239,152,170" },
        "WildWatermelon": { hex: "#FC6C85", rgb: "252,108,133" },
        "Scarlet": { hex: "#FC2847", rgb: "252,40,71" },
        "Salmon": { hex: "#FF9BAA", rgb: "255,155,170" },
        "BrickRed": { hex: "#CB4154", rgb: "203,65,84" },
        "White": { hex: "#EDEDED", rgb: "237,237,237" },
        "Timberwolf": { hex: "#DBD7D2", rgb: "219,215,210" },
        "Silver": { hex: "#CDC5C2", rgb: "205,197,194" },
        "Gray": { hex: "#95918C", rgb: "149,145,140" },
        "Black": { hex: "#232323", rgb: "35,35,35" }
    }

/*
export function colourToHex(colour)
{
    var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};

    if (typeof colours[colour.toLowerCase()] != 'undefined')
        return colours[colour.toLowerCase()];
    return false;
}
*/ 

    export class BarDataSet {
        
        _options = {
            scales: {
                xAxes: [{
                    // categorySpacing: 1
                    barPercentage: 0.5
                }],
                yAxes: [{
                    type: "linear",
                    display: true,
                    position: "left",
                    id: "y-axis-1",
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
        
        barData: LinearChartData = {
              labels: this.labels,    // e.g. ["January", "February", "March", "April", "May", "June", "July"],
              datasets: []
        }
        
        constructor( public labels: string[] ) {}
        
        setLabels( labels: string[] ) {
          this.labels = labels 
        }
          
        addDataSet(label: string, rgb: string, data: number[] ) {
            // var rgb = CxChord.colorSchema[color].rgb
             
            this.barData.datasets.push(
                {
                      label: label,
                      fillColor:      "rgba(" + rgb + ",0.5)",
                      strokeColor:    "rgba(" + rgb + ",0.8)",
                      highlightFill:  "rgba(" + rgb + ",0.75)",
                      highlightStroke:"rgba(" + rgb + ",1)",
                      // pointBorderWidth: 1.5,
                      // tension: -1,
                      // yAxisID: "y-axis-1",
                      data: data
                }
            )
        }
    }

    export class BayesChart extends BarDataSet {
        
        canvas: HTMLCanvasElement
        ctx: any 
        barChart: any
      
        constructor( htmlElement : string = 'visualization',  labels: string [] = [] ) {
            super( labels )
            this.canvas = <HTMLCanvasElement>document.getElementById(htmlElement)
            this.ctx = this.canvas.getContext('2d')
        }
           
        showChart() {
          this.barChart = new Chart(this.ctx).Bar(this.barData, this._options ); 
          document.getElementById('legend').innerHTML = this.barChart.generateLegend(); 
        }
    }   
    
    /*
    var myBarChartLegend: string = myBarChart.generateLegend();
    var myBarChartImage: string = myBarChart.toBase64Image();
    myBarChart.addData([1, 2, 3, 4, 5, 6, 7], 'new');
    myBarChart.clear();
    myBarChart.removeData();
    myBarChart.resize();
    myBarChart.update();
    myBarChart.stop();
    myBarChart.destroy();    
  */ 
}