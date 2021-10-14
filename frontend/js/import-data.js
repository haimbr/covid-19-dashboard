
import { createChart1 } from './charts/charts2.js';
import { createChart2 } from './charts/charts3.js';
import { createChart3 } from './charts/charts5.js';
import { createChart4 } from './charts/charts7.js';
import { createChart5 } from './charts/charts8.js';
import { createChart6 } from './charts/charts10.js';
import { createCitiesTable } from './charts/cities-table.js';
import { createHospitalsTable } from './charts/hospitals-table.js';




export let isDarkMode = false;
 
export function setIsDarkMode(){
    isDarkMode = !isDarkMode;
}

let localData;

const dataURL = 'http://localhost:3600/covid/get';
const hospitalsDataURL = 'http://localhost:3600/get-hospitals-data';
const citiesDataURL = 'http://localhost:3600/get-cities-data';

getData(dataURL, createCharts);
getData(citiesDataURL, createCitiesTable);
getData(hospitalsDataURL, createHospitalsTable);


export function getData(url, callback) {
    fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(res.status);
            };
        })
        .then((jsonObj) => {
            callback(jsonObj);
        })
        .catch((err) => {
            console.log(err)
        })
};



export function createCharts(data){
    if(data){
        localData = data;
        updateDataHeaders(localData);
    }    
    createChart2('chart2', localData , isDarkMode);
    createChart3('chart3', localData, isDarkMode);
    createChart4('chart4', localData, isDarkMode);
    createChart5('chart5', localData, 14, isDarkMode);
    createChart6('chart6', localData, 30, isDarkMode);
}









function updateDataHeaders(data){
    const headersContainer = document.querySelectorAll('.data-in-numbers-container');
    for(let i=0; i<headersContainer.length; i++){  
        if(i === 0){
            CreateHeaders(headersContainer[i], data[data.length-1].newCases.toLocaleString(), 'h1');
            CreateHeaders(headersContainer[i], `<b>${Math.floor(data[data.length-1].newCases/3).toLocaleString()}+</b> מחצות`, 'p')
            CreateHeaders(headersContainer[i], `<b>${data[data.length-1].activeCases.toLocaleString()}</b> סה"כ`, 'p');
        }else if(i === 1){
            CreateHeaders(headersContainer[i], data[data.length-1].activeCases.toLocaleString(), 'h1');
            CreateHeaders(headersContainer[i], `<b>${Math.floor(data[data.length-1].newCases/4).toLocaleString()}+</b> מחצות`, 'p')
            CreateHeaders(headersContainer[i], `בית/קהילה<br><b>${data[data.length-1].patientsLocation.home.toLocaleString()}</b>`, 'span');
            CreateHeaders(headersContainer[i], `מלון<br><b>${data[data.length-1].patientsLocation.hotel.toLocaleString()}</b>`, 'span');
            CreateHeaders(headersContainer[i], `בי"ח<br><b>${data[data.length-1].patientsLocation.hospital.toLocaleString()}</b>`, 'span');
        }else if(i === 2){
            updateLegend(data[data.length-1].respiratoryPatients, data[data.length-1].moderatelyCondition)
            CreateHeaders(headersContainer[i], data[data.length-1].severePatients.toLocaleString(), 'h1');
            CreateHeaders(headersContainer[i], `<b>${Math.floor(data[data.length-1].severePatients/10).toLocaleString()}+</b> מחצות`, 'p');
        }else if(i === 3){
            CreateHeaders(headersContainer[i], data[data.length-1].respiratoryPatients.toLocaleString(), 'h1');
            CreateHeaders(headersContainer[i], `<b>${Math.floor(data[data.length-1].respiratoryPatients/10).toLocaleString()}+</b> מחצות`, 'p');
        }else if(i === 4){
            CreateHeaders(headersContainer[i], data[data.length-1].totalDeath.toLocaleString(), 'h1');
        }else if(i === 5){
            CreateHeaders(headersContainer[i], data[data.length-1].positiveTestsPercentage.toLocaleString(), 'h1');
            CreateHeaders(headersContainer[i], `<b>${data[data.length-1].tests.toLocaleString()} +</b> בדיקות אתמול`, 'p');
        }
    }
}



function CreateHeaders(container, data, element){
    const header = document.createElement(element);
    header.innerHTML = data;
    container.appendChild(header);
}


function updateLegend(respiratoryPatients, moderatelyCondition){
    const container = document.getElementById('medical-condition-legend');
    CreateHeaders(container.children[0],`מתוכם קריטי <b>${respiratoryPatients}</b>`, 'p')
    CreateHeaders(container.children[1],`בינוני <b>${moderatelyCondition}</b>`, 'p')
}




// handles changing the date range of the charts
const buttons = document.querySelectorAll('.option-list-button');
const optionListContainers = document.querySelectorAll('.option-list');
const optionLists = document.querySelectorAll('.option-list > li');

for(let i=0; i< buttons.length; i++){
    buttons[i].addEventListener('click', () => {
        if(optionListContainers[i].style.display !== 'inline-block')
            optionListContainers[i].style.display = 'inline-block';
        else
            optionListContainers[i].style.display = 'none';
    });
};

for(let i=0; i< optionLists.length; i++){
    optionLists[i].addEventListener('click', (event) => {
        optionLists.forEach(element => {
            element.classList.remove('li-selected');
        })
        event.target.classList.add('li-selected');
        if(optionLists[i].parentNode === optionListContainers[0])
            createChart5('chart5', null, getRangeOfDates(i), isDarkMode);
        else
            createChart6('chart6', null, getRangeOfDates(i), isDarkMode);
    })
}




function getRangeOfDates(index){
    switch(index){
        case 0:
        case 4:
            return 200;
        case 1:
        case 5:
            return 7;
        case 2:
        case 6:
            return 14;
        case 3:
        case 7:
            return 30;
    };
};



handleFloatingChart();

function handleFloatingChart(){
    const body = document.querySelector('body');
    const containers = document.querySelectorAll('.contains-chart');
    const secondContainer = document.querySelector('.second-container');
    const icons = document.querySelectorAll('.chart-icon');
    const chart = document.querySelector('.chart-container');
    const subjects = ['respiratoryPatients', 'totalDeath', 'tests'];

    for(let i=0; i<icons.length; i++){
        icons[i].addEventListener('click', () => {
            createChart1('chart1', localData, subjects[i], isDarkMode)
            setTimeout(() =>{
                
                chart.style.display = 'block';
                containers[i].classList.add('data-element-selected');
                secondContainer.style.top = '-350px';
                placeChart(document.querySelector('.data-element-selected'), chart)
            },0)      
        });
    }


    body.addEventListener('click', (event) => {
        if(true){
            chart.style.display = 'none';
            secondContainer.style.top = '0px';
            for(let container of containers){
                container.classList.remove('data-element-selected');
            }
        }     
    });
};



function placeChart(parent, chart){
    let parentPosition = parent.getBoundingClientRect();
    let chartPosition = chart.getBoundingClientRect();
    let factor = 1;
    chart.style.left = '0px';
    chart.style.right = '0px';
    chart.style.top = '0px';
    if(window.innerWidth - parentPosition.right  > chartPosition.width){
        chart.style.right = `${window.innerWidth - parentPosition.right - chartPosition.width}px`;  
    }else if(parent.offsetLeft > chartPosition.width){
        chart.style.right = `${window.innerWidth - parent.offsetLeft}px`;
        factor = -1;
    }

    if(window.innerHeight - parentPosition.bottom > chartPosition.height){
        chart.style.right = `${1*chart.style.right.replace('px','') + factor * parentPosition.width}px`;
    }else if(parentPosition.bottom > chartPosition.height){
        chart.style.top = `-${chartPosition.height}px`;
    }else {
        chart.style.top = `-${parentPosition.height}px`;
    } 
}

const scrollContainer = document.querySelector('.scroll-container')

scrollContainer.addEventListener('scroll', () => {
    let chartContainer = document.querySelector('.chart-container');
    if(chartContainer.style.display === 'block'){
        placeChart(document.querySelector('.data-element-selected'), chartContainer)
    }
});



