






let allData;
const sortArrowsDirection = {
    city: true,
    color: true,
    score: true,
    newCases: true,
    positiveTests: true,
    verifiedChanges: true,
    activeCases: true,
}
const headersSubject = ['city', 'color', 'score', 'newCases', 'positiveTests', 'verifiedChanges', 'activeCases'];
const table = document.querySelector('.cities-table tbody');
const searchList = document.querySelector('.cities-table-header ul');
const searchWindow = document.getElementById('cities-search');
const headers = document.querySelector('.cities-headers').children;
const sortArrowsImg = document.querySelectorAll('.cities-arrow');


export function createCitiesTable(data){
    data.forEach(obj => {
        delete obj._id;
        delete obj.updatedAt;
        delete obj.createdAt;
        delete obj.__v;
    });
    allData = data;
    renderTable(allData, 'city', true);
}




searchWindow.addEventListener('input', () => {
    searchCity(allData, searchWindow.value)  
})



for(let i=0; i<headers.length; i++){
    headers[i].addEventListener('click', () =>{
        for (let i=0; i<sortArrowsImg.length; i++) {
            sortArrowsImg[i].style.display = 'none';
        }
        let isAscending = sortArrowsDirection[headersSubject[i]];
        sortArrowsDirection[headersSubject[i]] = !sortArrowsDirection[headersSubject[i]];

        renderTable(allData, headersSubject[i], isAscending);
        sortArrowsImg[i].style.display = 'block';
        sortArrowsImg[i].style.transform = isAscending ? 'rotate(0)': 'rotate(180deg)';
    })
}




function renderTable(data, priority, isAscending){
    clearChildren(table);
    data.sort((a, b) => {
        if(priority === 'city')
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
        tr.appendChild(td);
        if(property === 'color' || property === 'score'){
            let span = document.createElement('span');
            span.style.backgroundColor = getColor(data[property])
            if(property === 'score')
                span.innerHTML = data[property];
            td.appendChild(span)
        }
        else
            td.innerHTML = data[property];         
    }
    return tr;
}





function searchCity(data, searchValue){
    clearChildren(searchList)
    clearChildren(table)

    if(searchWindow.value == ''){
        renderTable(allData, 'city');
        return;
    }
    let result = data.filter(obj => obj.city.includes(searchValue));
    let resultList = result.map(x => x.city); 

    renderTable(result, 'city', true);
    resultList.forEach((city) =>{
        let li = document.createElement('li')
        li.innerHTML = city;
        searchList.appendChild(li)
    })

    
}


function clearChildren(parentElement){
    while (parentElement.children.length > 0) {
        parentElement.removeChild(parentElement.lastChild)
    }
}

function removeMarks(text){
    return text.replace('%', '').replace("קטן מ-15", 0)*1;
}


function getColor(data){
    let number = removeMarks(data);
    if(number < 4.5)
        return '#b8de92';
    if(number < 6)
        return '#fcfc70';
    if(number < 7.5)
        return '#f2c580';
    return '#fa9e8f';
}
