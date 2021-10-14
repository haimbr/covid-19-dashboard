



var categories = [
    '0-9', '10-19','20-29', '30-39','40-49',    
     '50-59','60-69', '70-79', '80-89' , '90 + '
];

Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
  
   
    xAxis: {        
        gridLineWidth: 1,
        categories: categories,
        reversed: false,
        crosshair: {
            enabled: true,
            dashStyle: 'LongDash',
            width: 0.5,
            color: 'rgba(0, 0, 0,  0.685)',
            zIndex: 100,
            snap: false,
            label: { 
                align: 'center' ,        
                enabled: true, 
                shape: 'square',
                backgroundColor: '#5252f5fc', 
                borderWidth: 0.5,
                padding:8,  
                style:{"color": "white"},  
                formatter: function(value){
                    return categories[Math.floor(value+0.5)];
                },        
            }
        },      
    },
   

    yAxis: {      
        crosshair: {
            enabled: true,
            dashStyle: 'LongDash',
            width: 0.5,
            color: 'rgba(0, 0, 0,  0.685)',
            zIndex: 100,
            snap: false,
            label: { 
                align: 'center' ,        
                enabled: true, 
                shape: 'square',
                backgroundColor: '#5252f5fc', 
                borderWidth: 0.5,
                padding:8 ,  
                style:{"color": "white"},  
                formatter: function(value) {
                    return Math.abs(Math.floor(value));
                  },        
            }
        },      
        tickLength: 7,
        tickWidth: 1,
        tickColor: 'black',
        title: {
            text: null
        },
        tickPositions:[-20,-10,0 ,10 ,20 ],
        labels: {            
            formatter: function () {
                return Math.abs(this.value) ;
            }
        },
    },

    

    tooltip:{
        shape: ' ',
        useHTML: true,
        borderWidth: 2,
        borderRadius: 4,
        color: 'red',
        formatter(){
            if(this.y < 0)
                return '<span class="tooltip-label1">' + this.x  + ' נשים'+  '<br>'  +
                Math.abs(this.y) + '% (' +Math.floor(Math.random()*2000) + ')' + '</span>';
            return '<span class="tooltip-label2">' + this.x  + ' גברים'+  '<br>'  + 
            this.y + '% (' +Math.floor(Math.random()*2000) + ')' + '</span>';
        }
    },




    plotOptions: {
        bar: {            
            dataLabels: {
                enabled: true,
                formatter: function() {
                    return Math.abs(this.y) + '%';
                },
                style:{fontWeight: '400', fontSize: '11px',fontFamily: 'sans-serif', color: '#8b8f9a'},
                inside: false,
            }
        },
        series: {
            stacking: 'normal',
            states: {
                inactive: {
                  opacity: 1
                }
              }
        },
        
    },

    

    series: [{
        name: 'Male',
        color: '#b6ca51',
        states: {
            hover: {
                borderColor: '#b6ca51',
            }
        },       
        borderRadiusBottomLeft: 5,
        borderRadiusBottomRight: 5,	
        data: [
            -5.2, -8.1,-9.2, -7.4,
            -6, -5.0, -3.3, -1.2,
            -0.9, -0.5
        ]
    }, {
        name: 'Female',
        color:'#50cbfd',
        states: {
            hover: {
                borderColor: '#50cbfd',
            }
        },       
        borderRadiusTopLeft: 5,
        borderRadiusTopRight: 5,
        data: [
            5.1, 8.5, 9.8, 6.4,
            6, 5.4, 4.3, 2.2,
            1.0, 0.4
            
        ]
    }]
});


