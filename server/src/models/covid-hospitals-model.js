const mongoose = require('mongoose');



const hospitalsSchema = new mongoose.Schema({
    hospital:{
        type: String,
    },
    generalOccupancy:{
        type: String,
    },
    covidOccupancy:{
        type: String,
    },
    staffInIsolation:{
        type: String,
    }
},{
    timestamps: true,
})

const Hospitals = mongoose.model('hospitals', hospitalsSchema)

module.exports = Hospitals;  