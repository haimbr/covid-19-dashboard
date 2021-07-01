



let allData;
const sortArrowsDirection = {
    hospital: true,
    generalOccupancy: true,
    covidOccupancy: true,
    staffInIsolation: true,
}
const headersSubject = ['hospital', 'generalOccupancy', 'covidOccupancy', 'staffInIsolation'];
const table = document.querySelector('.hospitals-table tbody');
const headers = document.querySelector('.hospitals-headers').children;
const sortArrowsImg = document.querySelectorAll('.hospitals-arrow');



export function createHospitalsTable(data){
    data.forEach(obj => {
        delete obj._id;
        delete obj.updatedAt;
        delete obj.createdAt;
        delete obj.__v;
    });
    allData = data;
    renderTable(allData, 'hospital', true);
}





for(let i=0; i<headers.length; i++){
    headers[i].addEventListener('click', () =>{
        for (let i=0; i<sortArrowsImg.length; i++) {
            sortArrowsImg[i].style.display = 'none';
        }
        let isAscending = sortArrowsDirection[headersSubject[i]];
        sortArrowsDirection[headersSubject[i]] = !sortArrowsDirection[headersSubject[i]];

        renderTable(allData, headersSubject[i], isAscending);
        sortArrowsImg[i].style.display = 'inline-block';
        sortArrowsImg[i].style.transform = isAscending ? 'rotate(0)': 'rotate(180deg)';
    })
}




function renderTable(data, priority, isAscending){
    clearChildren(table);
    data.sort((a, b) => {
        if(priority === 'hospital')
            return (a[priority] > b[priority]) ? 1: -1;
        return removeMarks(a[priority]) > removeMarks(b[priority]) ? 1: -1;
    })

    let start = isAscending ? 0: data.length-1;
    let end = isAscending ? data.length: -1;
    let factor = isAscending ? 1: -1;
    for(let i=start; i!==end; i+=factor){
        table.appendChild(createTr(data[i])) 
    }
}



function createTr(data){
    let tr = document.createElement('tr');
    for(const property in data){
        let td = document.createElement('td');
        td.innerHTML = data[property];     
        if(property === 'covidOccupancy' || property === 'generalOccupancy'){
            
            td.appendChild(createBar(removeMarks(data[property])));
        }
        tr.appendChild(td);    
    }
    return tr;
}



function createBar(data){
    let span = document.createElement('span');
    let spanInner = document.createElement('span');
    spanInner.style.width = `${data < 100? Math.floor(data/2) : 150}px`
    spanInner.style.backgroundColor = `${data < 100? '#50cbfd': '#374f60'}`
    span.appendChild(spanInner);
    return span;
}



function clearChildren(parentElement){
    while (parentElement.children.length > 0) {
        parentElement.removeChild(parentElement.lastChild)
    }
}

function removeMarks(text){
    return text.replace('%', '').replace("אין מידע", 0)*1;
}



