const regularColors = {
    backgroundColor: 'white',
    fontColor: '#222b45',
    lineColor: '#16dae6',
}

const darkMode = {
    backgroundColor: '#384f5f',
    fontColor: 'white',
    lineColor: '#2cd2db',
}




function createData(data){
    let chartData = [];
    let currentWeek = 0;
    let base = 0;
    for(let i=data.length-20; i<data.length; i++){
        if(i <data.length-13 ){
            base += data[i].newCases;
        }else if(i <data.length-7){
            currentWeek += data[i].newCases;
        }else{
            currentWeek += data[i].newCases;
            chartData.push([Date.parse(data[i].date), getPercentageChange(base, currentWeek) / 7]);
            currentWeek -= data[i-6].newCases;
            base += data[i-6].newCases;
            base -= data[i-13].newCases;
        }
        
    }
    return chartData;
}


function getPercentageChange(oldNumber, newNumber){
    var decreaseValue = oldNumber - newNumber;
    return (decreaseValue / oldNumber) * -100;
}




export function createChart2(container, data, isDarkMode){
    let colors = isDarkMode? darkMode: regularColors;
    let chartData = createData(data);
    let tickPositions = [];
    chartData.forEach(row => tickPositions.push(row[0]));
    let maxValue = 0;
    chartData.forEach(row => {if(row[1]+2>maxValue) maxValue = row[1]+2});



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
            lineColor: 'colors.backgroundColor',
            labels: {
                formatter: function() {                   
                    return new Date(this.value).getDate() + '.' + new Date(this.value).getMonth();                   
                },
                style: {color: colors.fontColor }
            },
        },
       
        yAxis:{
            gridLineWidth: 0,
            max: maxValue,
            title:{
                text: 'אחוז שינוי יומי',
                style: {color: colors.fontColor }
            },
            labels: {
                x: 1,
                useHTML: true,
                formatter: function() {
                    return this.value + '%' ;
                },
                style: {
                    color: colors.fontColor
                }
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
                    useHTML: true,
                    formatter: function() {           
                        return `<span class="bold-font">${Math.floor(this.y)}% </span>
                        <br>(${getDoublingRate(this.y)}) `;
                    },
                    style:{fontWeight: '100', fontSize: '12px',fontFamily: 'sans-serif', color: colors.fontColor},
                },
    
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0,'#87dcfe'],
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



function getDoublingRate(percentage){
    if(percentage <= 0)
        return 'דעיכה';
    return Math.ceil(Math.log(2) / Math.log(1 + (percentage / 100)));
}






