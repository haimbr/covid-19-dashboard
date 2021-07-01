const CSVToJSON = require('csvtojson');

const fileSystem = require('fs');
const { findOne, findOneAndUpdate } = require('../models/covid-model');
require('../db/mongoose');
const Covid19 = require('../models/covid-model');




CSVToJSON().fromFile('./data/h.csv').then(source => {  
    console.log(source)      
    console.log(source.length)      
})




async function updateDB2(source){
    for(let i=0; i<source.length; i++){
        try{
            const data = await Covid19.findOneAndUpdate({date:source[i].date}, {
                moderatelyCondition: source[i].medium
                // positiveTestsPercentage: `${parseFloat(source[i].positiveTests / source[i].tests * 100).toFixed(1)}%`,
                // positiveTests: source[i].positiveTests,
                // tests: source[i].tests,
                // patientsLocation:{
                //     home: source[i].home,
                //     hotel: source[i].hotel,
                //     hospital: source[i].hospital,
                // }
            });
          
            console.log(data)
        }catch(err){
            console.log(err)
        }
    }
    console.log('done')
    
}





// CSVToJSON().fromFile('./data/data.csv').then(source => {  
//     updateDB(source);      
// })


// temp();

async function temp(){
    const data1 = await Covid19.findOne({})
    try{
        
        console.log(data1)
    }catch(err){
        console.log(err, 'err')
    }
};









async function updateDB(source){
    let prevCases = 0;
    let prevRecovery = 0;
    let prevDeath = 0;


    let newCases;
    let newDeath;
    let newRecovery;

    for(let i=0; i<source.length; i++){
        newCases = source[i].totalCases - prevCases;
        newDeath = source[i].totalDeath - prevDeath;
        newRecovery = source[i].totalRecovery - prevRecovery;

        prevCases = source[i].totalCases;
        prevDeath = source[i].totalDeath;
        prevRecovery = source[i].totalRecovery;

        const covidData = new Covid19({
            date:source[i].date,
            totalCases:source[i].totalCases,
            newCases: newCases,
            activeCases: source[i].activeCases,
            totalDeath: source[i].totalDeath,
            newDeath: newDeath,
            totalRecovery: source[i].totalRecovery,
            newRecovery: newRecovery,
        });

        try{
            await covidData.save();
        }catch(err){
            console.log(err, 'err')
        }
    }
    console.log('done');
}
