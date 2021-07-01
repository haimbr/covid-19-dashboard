




// let lastWeekData = {}
// let lastTwoWeeksData = {}
// let allData = {}
// let lastMonth = {}


const regularColors = {
    backgroundColor: 'white',
    fontColor: '#222b45',
    barColor1: '#1c7d7e',
    barColor2: '#898989',
    areaColor: '#b1ebf1',
    areaColor2: 'rgb(255, 255, 255, 0.0)',
    linesColor: '#ccc'
}

const darkMode = {
    backgroundColor: '#384f5f',
    fontColor: 'white',
    barColor1: '#fd8264',
    barColor2: '#9ffa82',
    areaColor: '#384f5f',
    areaColor2: '#384f5f',
    linesColor: '#384f5f'
}


let allData = [];

export function createChart5(container, data, datesRange, isDarkMode){

    if(data){
        allData = data;
    };


    let newCases = [];
    let newRecovery = [];
    let totalCases = [];
    let dates = [];


    for(let i=allData.length-datesRange; i<allData.length; i++){
        newCases.push(allData[i].newCases);
        newRecovery.push(allData[i].newRecovery);
        totalCases.push(allData[i].totalCases);
        dates.push(Date.parse(allData[i].date));
    }
    chartLauncher(container, dates, totalCases, newCases, newRecovery, isDarkMode)

}



function chartLauncher(container,dates, totalCases, newCases, newRecovery, isDarkMode){
    let colors = isDarkMode? darkMode: regularColors;


    Highcharts.chart(container, {
        chart: {
            height: 250, 
            style: {fontFamily: 'sans-serif'},
            backgroundColor: colors.backgroundColor,
        },    
    
    
        xAxis: {
            lineColor: colors.linesColor,
            categories: dates,
            type: 'datetime',
            labels:{
                formatter: function(){
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
                        return new Date(this.categories[value]).getDate() + '.' + new Date(this.categories[value]).getMonth();
                    }
                }
            },      
        },
    
    
    
    
       
    
        yAxis: [{ 
            gridLineColor: colors.linesColor,
            crosshair: {
                enabled: true,
                dashStyle: 'LongDash',
                width: 0.9,
                color: colors.linesColor, 
                snap: false,
                label: { 
                    align: 'right' ,        
                    enabled: true, 
                    shape: 'square',
                    backgroundColor: colors.backgroundColor, 
                    borderWidth: 0.05,
                    borderColor: colors.fontColor,
                    padding:8,  
                    style:{"color": colors.fontColor,},  
                    formatter: function(value){
                        return Math.floor(value).toLocaleString();
                    },   
                         
                }
            },      
            labels: {
                formatter: function(){
                    return Math.floor(this.value).toLocaleString();
                },  
                style: {color: colors.fontColor,}
            },
            title: {
                text: 'מספר מקרים מצטבר',
                style: {color: colors.fontColor,}
            }
        },
        { 
            gridLineColor: colors.linesColor,
            crosshair: {
                enabled: true,
                dashStyle: 'LongDash',
                width: 0.5,
                color: colors.linesColor,
                snap: false,
                label: { 
                    align: 'left' ,        
                    enabled: true, 
                    shape: 'square',
                    backgroundColor: colors.backgroundColor, 
                    borderWidth: 0.05,
                    borderColor: colors.fontColor,
                    padding:8,  
                    style:{"color": colors.fontColor},  
                    formatter: function(value){
                        return Math.floor(value).toLocaleString();
                    },        
                }
            },   
            title: {
                text: 'מספר מקרים חדשים',
                style: {color: colors.fontColor,}
            },
            labels: {
                formatter: function(){
                    return Math.floor(this.value).toLocaleString();
                },  
                style: {color: colors.fontColor,}
            },
            opposite: true,
        },],
        
        
        tooltip: {
            
        },
    
        tooltip: {
            followPointer: true,
            backgroundColor: colors.backgroundColor,
            borderColor: colors.fontColor,
            borderWidth: 0.1,
            distance: 70,
            zIndex: 110,
            
            formatter () {
                return `<div class=chart-tooltip style=color:${this.points[0].color};>${this.points[0].y} חולים קשים </div>
                <div class=chart-tooltip style=color:${this.points[1].color};>${this.points[1].y} מונשמים</div>
                <div class=chart-tooltip style=color:${this.points[2].color};>${this.points[2].y} מונשמים</div>`
            },
            shared: true,
            useHTML: true
        },
       
       
    
    
    
        credits: {
            enabled: false
        },
    
        title: {
            text: '',
        },
    
    
        legend: {
            align: 'right',
            verticalAlign: 'top',
            layout: 'horizontal',
            rtl: true,
            itemStyle: {
                color: colors.fontColor,
            }
            
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
                        [0,colors.areaColor],
                        [1, colors.areaColor2]
                    ]
                },
                      
            },

                
        },
    
    
    
       
        series: [{
            name: 'מאומתים חדשים',
            zIndex: 100,
            type: 'column',
            yAxis: 1,
            data: newCases,
            color: colors.barColor1,
            pointWidth: 8,
            borderWidth: 0,
            borderRadiusTopLeft: 5,
            borderRadiusTopRight: 5,
            // pointPlacement: 'on',
        },{
            name: 'מחלימים חדשים',
            zIndex: 100,
            type: 'column',
            yAxis: 1,
            data: newRecovery,
            color: colors.barColor2,
            pointWidth: 8,
            borderWidth: 0,
            borderRadiusTopLeft: 5,
            borderRadiusTopRight: 5,
            // pointPlacement: 'on',
        }, {
            name: 'מאומתים מצטבר',
            type: 'area',
            data: totalCases,
            // pointPlacement: 'on',
        }]
    });
}

