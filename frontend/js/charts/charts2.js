

const regularColors = {
    backgroundColor: 'white',
    fontColor: '#222b45',
    lineColor: '#cccccc',
    areaColor: '#16dae6'
}

const darkMode = {
    backgroundColor: '#384f5f',
    fontColor: 'white',
    lineColor: '#384f5f',
    areaColor: '#2cd2db'
}

export function createChart1(container, data, dataSubject, isDarkMode){
    let chartData = [];
    for(let i=0; i<data.length; i++){
        chartData.push([Date.parse(data[i].date), ('' + data[i][dataSubject]).replace('%', '')*1]);
    }
    chartLauncher(container, chartData, dataSubject, isDarkMode)
}


function chartLauncher(container, data, dataSubject, isDarkMode){
    let titles = getTitle(dataSubject);
    let colors = isDarkMode? darkMode: regularColors;

    Highcharts.chart(container, {

        chart: {
            height: 260,
            backgroundColor: colors.backgroundColor,
            events: {
                load: function(){
                let points = this.series[0].points;
                for(let i=0; i<330; i++) {
                    if(getMarkedPositions(data).includes(i)){
                        points[i].update({
                            marker: {
                                enabled: true,
                                fillColor: colors.areaColor,
                                radius: 5,                            
                            }
                        });
                    }
                    
                }             
            }
          }
        },
        responsive: {  
            rules: [{  
                condition: {  
                    minWidth: 500
               },  
                chartOptions: {
                    chart: {
                        width: 400
                    },
                }
            }]  
        },
        
        credits:{
            enabled: false
        },
    
        legend: {
            enabled: false
        },
           
        title: {
            text: '',
        },
        
        
    
        tooltip:{
            followPointer: true,
            backgroundColor: colors.backgroundColor,
            borderWidth: 0.5,
            distance: 70,
            borderColor: 'rgb(179 168 168)',  
            fontSize: '60px',
            zIndex: 121,
            style:{color: colors.areaColor,fontWeight: 'bold', fontSize: '15px',fontFamily: 'sans-serif', opacity: '1'},  
            formatter(){
                return `${parseInt(this.y)} ${titles.header}`
            },
            positioner: function(labelWidth, labelHeight, point) {
                var tooltipY = point.plotY + 30;
                if(point.plotX < 100)
                    var tooltipX = point.plotX + 100;
                else
                    var tooltipX = point.plotX - 40;
                return {
                    x: tooltipX,
                    y: tooltipY
                };
            }
        },
       
    
    
    
        xAxis: {
            lineColor: colors.lineColor,
            type: 'datetime',
            title: {
                text: 'תאריך',
                style: {color: colors.fontColor }
            },
            tickLength: 0,
            labels: {
                formatter: function() {
                    return new Date(this.value).getDate() + '.' + new Date(this.value).getMonth();
                },
                style: {color: colors.fontColor }
            },    
            tickPositions:getXTickPositions(data),
            crosshair: {
                enabled: true,
                width: 0.5,
                color: colors.fontColor,
                zIndex: 100,
                label: {
                    enabled: true, 
                    shape: 'square',
                    backgroundColor: colors.backgroundColor,  
                    borderWidth: 0.1,
                    padding:10,
                    borderColor: colors.fontColor ,  
                    style:{color: colors.fontColor},
                    formatter: function(value) {
                        return  new Date(value).getDate() + '.' + new Date(value).getMonth();
                      },          
                }
            },      
        },
    
    
    
    
    
        yAxis: {
            gridLineColor: colors.lineColor,
            labels: {
                formatter: function() {
                    return this.value.toLocaleString();
                },
                style:{color: colors.fontColor},
            },
    
            tickPositions:getYTickPositions(data),
            title:{
                text: titles.subTitle,
                style: {color: colors.fontColor }
            },
            crosshair: {
                enabled: true,
                dashStyle: 'LongDash',
                width: 0.5,
                color: colors.fontColor,
                zIndex: 100,
                label: {             
                    enabled: true, 
                    shape: 'square',
                    backgroundColor: colors.backgroundColor, 
                    borderWidth: 0.1,
                    padding:10,
                    borderColor: colors.fontColor ,  
                    style:{"color": colors.fontColor}, 
                    formatter: function(value) {
                        return value.toLocaleString();
                      },        
                }
            },      
        },
    
    
    
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0,'#00ffff	'],
                        [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },           
            }
        },
       
    
    
    
        series: [{
            type: 'area',
            data: data,  
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true,
                        radius: 8,
                        fillColor: '#0adedebf',
                        border: false
                    }
                }
            },
        }]
    });    
}










function getMarkedPositions(data){
    let factor = Math.floor(data.length / 6);
    return[0, factor, factor*2, factor*3, factor*4, factor*5, factor*6]
}


function getXTickPositions(data){
    let factor = Math.floor(data.length / 6);
    return[data[0][0], data[factor][0], data[factor*2][0], data[factor*3][0], data[factor*4][0], data[factor*5][0],data[factor*6][0]];
}

function getYTickPositions(data){
    let maxValue = 0;
    data.forEach(row => {if(row[1]>maxValue) maxValue = row[1]});
    let factor = Math.floor(maxValue / 3.4);
    return[0, factor, factor*2, factor*3, maxValue];
}


function getTitle(subject){
    switch(subject){
        case 'respiratoryPatients':
            return {
                title: 'מונשמים-שינוי יומי',
                subTitle: 'כמות מונשמים',
                header: 'מונשמים'
            };
        case 'totalDeath':
            return {
                title: 'נפטרים-שינוי יומי',
                subTitle: 'כמות נפטרים',
                header: 'נפטרים'
            };
        case 'tests':
        return {
            title: 'בדיקות-מגמת שינוי יומי',
            subTitle: 'מספר בדיקות יומיות',
            header: 'בדיקות'
        };
    }
}
