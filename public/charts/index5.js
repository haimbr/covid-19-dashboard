

const regularColors = {
    backgroundColor: 'white',
    fontColor: '#222b45',
    lineColor: '#4d9ea3d9',
    areaColor: '#4d9ea3d9'
}

const darkMode = {
    backgroundColor: '#384f5f',
    fontColor: 'white',
    lineColor: '#8fdf7c',
    areaColor: '#80c678'
}



function createData(data){
    let chartData = [];
    
    for(let i=data.length-7; i<data.length; i++){
        chartData.push([Date.parse(data[i].date), data[i].severePatients]);
    }
    return chartData;
}

function getTickPositions(data){
    let maxValue = 0;
    data.forEach(row => {if(row[1]>maxValue) maxValue = row[1]});
    let base = (maxValue*0.9) / 3
    return [0, base*1+20, base*2+20, base*3+20, maxValue+43]
}



export function createChart3(container, data, isDarkMode){
    let colors = isDarkMode? darkMode: regularColors;
    let chartData = createData(data);
    let tickPositions = [];
    chartData.forEach(row => tickPositions.push(row[0]));

    Highcharts.chart(container, {
        chart: {
            type: 'area',  
            height: 250,     
            backgroundColor: colors.backgroundColor,
        },

        responsive: {  
            rules: [{  
                condition: {  
                    maxWidth: 500  
                },
                
                chartOptions: {
                    xAxis:{
                        tickPositions: [chartData[0][0], chartData[2][0], chartData[4][0], chartData[6][0]],
                    }
                }
                
            }]  
        },
    
        title: {
            text: '',
        },
       
        credits: {
            enabled: false
        },
    
        xAxis: {
            tickPositions: tickPositions,
            type: 'datetime',
            tickLength: 0,
            lineColor: colors.backgroundColor,
            labels: {
                formatter: function() {
                    return new Date(this.value).getDate() + '.' + new Date(this.value).getMonth();
                },
                style: {color: colors.fontColor}
            },
        },
       
        yAxis:{
            
            gridLineWidth: 0,
            
            tickPositions: getTickPositions(chartData),
            title:{
                text: ''
            },
            labels: {            
                formatter: function() {               
                    return this.value;
                },
                style: {color: colors.fontColor}
            },
        },
    
        tooltip: {
            enabled: false
        },
    
        legend: {
            enabled: false
        },
    
        plotOptions: {
            area: {
                dataLabels: {
                    enabled: true,
                    style:{fontWeight: '100', fontSize: '11px',fontFamily: 'sans-serif',color: colors.fontColor},
                },
    
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0,colors.areaColor],
                        [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                      
            }
        },
    
        series: [{
            data: chartData,
            lineColor: colors.lineColor,
            marker: {
                radius: 3,
                fillColor: colors.backgroundColor,
                lineWidth: 2,
                lineColor: colors.lineColor,
                states: {
                    hover: {
                        enabled: false,
                    }
                }
            },
        }]
    
    }); 
    
}
