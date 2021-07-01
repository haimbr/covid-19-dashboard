
let elevationData1 = [
    [1605996000000, 310295],
    [1606082400000 , 314865],
    [1606168800000 , 319285],
    [1606255200000 , 319999],
    [1606341600000 , 319486],
    [1606428000000 , 316948],
    [1606514400000 , 310587],  
];
let elevationData2 = [
    [1605996000000, 1],
    [1606082400000 , 3],
    [1606168800000 , 3],
    [1606255200000 , 2],
    [1606341600000 , 1],
    [1606428000000 , 5],
    [1606514400000 , 5],  
];

let elevationData3 = [
    [1605996000000, 3],
    [1606082400000 , 2],
    [1606168800000 , 1],
    [1606255200000 , 4],
    [1606341600000 , 3],
    [1606428000000 , 2],
    [1606514400000 , 2],  
];

var chart = Highcharts.chart('container', {


    title: {
        text: '',
    },
   
    credits: {
        enabled: false
    },

    xAxis: {
        type: 'datetime',
        tickLength: 0,
        lineColor: '#ffffff',
        labels: {
            formatter: function() {
                return new Date(this.value).getDate() + '.' + new Date(this.value).getMonth();
            }
        },
    },
   
    yAxis:{
        
       
        
        tickPositions:[0 ,79400 ,158800 ,238200 ,317600 ,397000],
        title:{
            text: 'אחוז שינוי יומי'
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
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0,'#9ee2f3'],
                    [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
                  
        }
    },

    series: [{
        name: 'מחלימים חדשים',
        type: 'column',
        yAxis: 1,
        data: elevationData2,
        // pointPlacement: 'on',

    },{       
        data: elevationData1,
        name: 'מספר מקרים מצטבר',
        type: 'area',        
    },]

}); 



