
import {isDarkMode, setIsDarkMode, createCharts} from './import-data/import-data.js'

const button = document.getElementById('accessibility');
const chartIcons = document.querySelectorAll('.chart-icon')
const infoIcon = document.querySelectorAll('.info-icon')
const head = document.querySelector('head');




button.addEventListener('click', () => {
    if(!isDarkMode)
        launchDarkMode();
    else
        launchRegularMode();
});



function launchDarkMode() {
    let newStyle = document.createElement('link');
    newStyle.setAttribute("rel", "stylesheet");
    newStyle.setAttribute("href", "dark-style.css");
    head.appendChild(newStyle);
    chartIcons.forEach(icon => {
        icon.src = '../images/chart-icon-dark-mode.svg';
        icon.style.backgroundColor = '#2c3a46'
    });
    infoIcon.forEach(icon => {
        icon.src = '../images/info-icon-dark-mode.svg';
    });
    setIsDarkMode();
    createCharts();
};




function launchRegularMode() {
    head.removeChild(head.lastChild);
    chartIcons.forEach(icon => {
        icon.src = '../images/chart-icon.svg';
        icon.style.backgroundColor = 'white'
    });
    infoIcon.forEach(icon => {
        icon.src = '../images/info-icon.svg';
    });
    setIsDarkMode();
    createCharts();
};