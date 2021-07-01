const CSVToJSON = require('csvtojson');

const fileSystem = require('fs');
const { findOne, findOneAndUpdate } = require('../models/covid-hospitals-model');
require('../db/mongoose');
const Hospitals = require('../models/covid-hospitals-model');




CSVToJSON().fromFile('../data/h.csv').then(source => {  
    getHospitalsData(source)      
    console.log(source.length)      
})

let hospitalsData = []

async function getHospitalsData(rows){
    

    for(let i=0; i<rows.length; i+=4){
        
        const data = new Hospitals({
            hospital: (rows[i].temp),
            generalOccupancy: (rows[i+1].temp),
            covidOccupancy: (rows[i+2].temp),
            staffInIsolation : (rows[i+3].temp),
        });

        try{
            await data.save();
            console.log(data)
        }catch(err){
            console.log(err, 'err')
        }
    };
    console.log(hospitalsData);
    
}


function reverse(st){
    if(isNaN(st) && !st.includes('%'))
        return st.split("").reverse().join("");
    return st;
}