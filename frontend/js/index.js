
import './import-data.js';
import './accessibility.js';



backdropHandler();
sideNavHandler();
floatingInfoHandler();


// handle with the side nav
function sideNavHandler(){
    const button = document.querySelector('#header-button-container');
    const line = document.querySelectorAll('.header-button-line');
    const sideNav = document.querySelector('#side-nav');
    const dataElements = document.querySelectorAll('.side-nav-not-active');

    button.addEventListener('click', function(){   
        
        if(line[1].style.display != "none"){
            line[1].style.display = "none";
            line[0].classList.add('header-button-x1');
            line[2].classList.add('header-button-x2');
            sideNav.style.display = 'inline-block';
            if(document.querySelector('html').offsetWidth > 800){
                for(let i=0; i<dataElements.length; i++)
                dataElements[i].classList.add('side-nav-active');
            }      
        }else{
            line[1].style.display = "block";
            line[0].classList.remove('header-button-x1');
            line[2].classList.remove('header-button-x2');
            sideNav.style.display = 'none';
            for(let i=0; i<dataElements.length; i++)
                dataElements[i].classList.remove('side-nav-active');
        }
    }); 
}


function floatingInfoHandler(){
    const floatingWindows = document.querySelectorAll('.info-container');
    const infoIcons = document.querySelectorAll('.info-icon');

    for(let i=0; i<infoIcons.length; i++){
        infoIcons[i].addEventListener('mouseover', () => {
            floatingWindows[i].style.display = "block"
        });
        infoIcons[i].addEventListener('mouseout', () => {
            floatingWindows[i].style.display = "none"
        })     
    }
}







function backdropHandler(){
    const backdrop = document.querySelector('.backdrop');
    const disclaimer = document.querySelector('.disclaimer-container');
    const button = document.querySelector('#disclaimer-button');

    button.addEventListener('click',() => {
        backdrop.style.display = 'none';
        disclaimer.style.display = 'none';
    })
}
