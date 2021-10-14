const mongoose = require('mongoose');



const citiesSchema = new mongoose.Schema({
    city:{
        type: String,
    },
    color:{
        type: String,
    },
    score:{
        type: String,
    },
    newCases:{
        type: String,
    },
    positiveTests:{
        type: String,
    },
    verifiedChanges:{
        type: String,
    },
    activeCases:{
        type: String,
    }
},{
    timestamps: true,
})

const Cities = mongoose.model('cities', citiesSchema)

module.exports = Cities;  