

const regularColors = {
    backgroundColor: 'white',
    fontColor: '#222b45',
    barColor: '#b6ca51'
}

const darkMode = {
    backgroundColor: '#384f5f',
    fontColor: 'white',
    barColor: '#fd8264'
}



function createData(data){
    let chartData = [];
    for(let i=data.length-7; i<data.length; i++){
        chartData.push([Date.parse(data[i].date), Math.floor(data[i].newCases * 0.9)]);
    }
    return chartData;
}


function getTickPositions(data){
    let maxValue = 0;
    data.forEach(row => {if(row[1]>maxValue) maxValue = row[1]});
    let base = 100 * Math.floor(((maxValue*1.22) / 6) / 100) 

    return [0, base*1, base*2, base*3, base*4, base*5, base*6]
}



export function createChart4(container, data, isDarkMode){
    let colors = isDarkMode? darkMode: regularColors;
    let chartData = createData(data);
    let tickPositions = [];
    chartData.forEach(row => tickPositions.push(row[0]));



    Highcharts.chart(container, {

        chart: {
            type: 'column', 
            height: 250,    
            backgroundColor: colors.backgroundColor,   
        },
    
        title: {
            text: '',
        },
       
        credits: {
            enabled: false
        },
    
        xAxis: {
            tickPositions:tickPositions,
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
       
        
        yAxis: {
            gridLineWidth: 0,
            tickPositions: getTickPositions(chartData),
            labels: {
                x: 10,
                formatter: function() {
                    return this.value.toLocaleString();
                },
                style: {color: colors.fontColor }
            },
            title:{
                text: ''
            },
        },
    
    
    
        tooltip: {
            enabled: false
        },
    
        legend: {
            enabled: false
        },
    
        
    
        plotOptions:{
            column:{
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return this.y;
                    },
                    style:{fontWeight: '100', fontSize: '10px',fontFamily: 'sans-serif',color: colors.fontColor},
                },
            }
        },
    
    
        series: [{
            borderWidth: 0,
            pointWidth: 10,      
            color: colors.barColor,
            data: chartData,
            borderRadiusTopLeft: 5,
            borderRadiusTopRight: 5,
        }]
    
    }); 
}





