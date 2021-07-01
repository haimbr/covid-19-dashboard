const CSVToJSON = require('csvtojson');

const fileSystem = require('fs');
const { findOne, findOneAndUpdate } = require('../models/covid-cities-model');
require('../db/mongoose');
const Cities = require('../models/covid-cities-model');



CSVToJSON().fromFile('../data/cities.csv').then(source => {  
    getHospitalsData(source)      
    console.log(source.length)      
})



async function getHospitalsData(rows){
    

    for(let i=0; i<rows.length; i+=6){
        
        const data = new Cities({
            city: rows[i].temp,
            color: rows[i+1].temp,
            score: rows[i+1].temp,
            newCases: rows[i+2].temp,
            positiveTests: rows[i+3].temp,
            verifiedChanges : rows[i+4].temp,
            activeCases : rows[i+5].temp,
        });

        try{
            await data.save();
            console.log(data)
        }catch(err){
            console.log(err, 'err')
        }
    };
  console.log('fff')
    
}


function reverse(st){
    if(isNaN(st) && !st.includes('%'))
        return st.split("").reverse().join("");
    return st;
}