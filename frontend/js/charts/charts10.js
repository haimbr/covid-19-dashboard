 
 


const regularColors = {
    backgroundColor: 'white',
    fontColor: '#222b45',
    lineColor1: '#1c7d7e',
    lineColor2: '#b6ca51',
    linesColor: '#50cbfd'
}

const darkMode = {
    backgroundColor: '#384f5f',
    fontColor: 'white',
    barColor1: '#fd8264',
    barColor2: '#2cd2db',
    linesColor: 'white'
}



let allData = [];

export function createChart6(container, data, datesRange, isDarkMode){

    if(data){
        allData = data;
    };


    let severePatients = [];
    let respiratoryPatients = [];


    for(let i=allData.length-datesRange; i<allData.length; i++){
        severePatients.push([Date.parse(allData[i].date), allData[i].severePatients]);
        respiratoryPatients.push([Date.parse(allData[i].date), allData[i].respiratoryPatients]);
    }
    chartLauncher(container, severePatients, respiratoryPatients, isDarkMode)

}



function chartLauncher(container, severePatients, respiratoryPatients, isDarkMode){
    let colors = isDarkMode? darkMode: regularColors;

    Highcharts.chart(container, {

        chart: {
            height: 250, 
            style: { fontFamily: 'sans-serif' },
            backgroundColor: colors.backgroundColor,
        },    
    
        credits: {
            enabled: false
        },

        title: {
            text: '',
        },
    
    
        xAxis: {
            tickLength: 0,
            labels: {
                formatter: function() {
                    return new Date(this.value).getDate() + '.' + new Date(this.value).getMonth();
                },
                style: {color: colors.fontColor}
            },   
            crosshair: {
                enabled: true,
                width: 0.5,
                color: colors.linesColor,
                label: {                      
                    enabled: true, 
                    shape: 'square',
                    backgroundColor: colors.backgroundColor, 
                    borderWidth: 0.1,
                    borderColor: colors.fontColor,
                    padding:8 ,  
                    style:{"color": colors.fontColor},  
                    formatter: function(value){
                        return new Date(value).getDate() + '.' + new Date(value).getMonth();;
                    }
                }
            },      
        },
    
    
        yAxis: {     
            tickPositions: getTickPositions(respiratoryPatients, severePatients), 
            crosshair: {
                enabled: true,
                dashStyle: 'LongDash',
                width: 0.5,
                color: colors.linesColor,
                snap: false,
                label: { 
                    enabled: true, 
                    shape: 'square',
                    backgroundColor: colors.backgroundColor, 
                    borderWidth: 0.1,
                    borderColor: colors.linesColor,
                    padding:8 ,  
                    style:{"color": colors.fontColor},   
                    formatter: function(value) {
                        return Math.floor(value);
                      },        
                }
            },   
            
            labels: {
                style: {color: colors.fontColor}
            },  
            
            title: {
                text: 'מספר מקרים',
                style: {color: colors.fontColor}
            },
      
        },
    
    
        legend: {
            align: 'right',
            verticalAlign: 'top',
            layout: 'horizontal',
            rtl: true,
            symbolRadius: 7,
            symbolWidth: 7,
            itemStyle: {
                color: colors.fontColor,
            }
        },
        
        plotOptions: {
            series: {
                states: {
                    hover: {
                        lineWidth: 1.5,
                    }
                },
                marker: {
                    radius: 4,
                    symbol: 'circle',
                    states: {
                        hover: {
                            lineWidth: 0.1,
                            radius: 7,
                            symbol: 'circle'
                        }
                    }
                },
            }
        },
        
        tooltip: {
            followPointer: true,
            backgroundColor: colors.backgroundColor,
            borderWidth: 0.5,
            distance: 70,
            zIndex: 100,
            rtl: true,
            formatter () {
              return `<div class=chart-tooltip style=color:${this.points[0].color};>${this.points[0].y} חולים קשים </div>
               <div class=chart-tooltip style=color:${this.points[1].color};>${this.points[1].y} מונשמים</div>`
            },
            shared: true,
            useHTML: true
        },
     
         series: [{
            name: "מושמים",
             data: respiratoryPatients,
             color: colors.barColor1,
         }, {
             name: "חולים קשה",
             data: severePatients,
             color: colors.barColor2,
         }, ],        
     }); 
}



function getTickPositions(series1, series2){
    let maxValue = 0;
    series1.forEach(row => {if(row[1]>maxValue) maxValue = row[1]});
    series2.forEach(row => {if(row[1]>maxValue) maxValue = row[1]});
    let base = Math.floor((maxValue * 1.05)/5); 
    return [0, base*1, base*2, base*3, base*4, maxValue]
}