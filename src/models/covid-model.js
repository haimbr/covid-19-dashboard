const mongoose = require('mongoose');



const covidSchema = new mongoose.Schema({
    date:{
        type: Date,
        required: true,
    },

    totalCases:{
        type: Number,
    },

    newCases:{
        type: Number,
    },

    activeCases:{
        type: Number,
    },


    totalDeath:{
        type: Number,
    },

    newDeath:{
        type: Number,
    },

    totalRecovery:{
        type: Number,
    },

    newRecovery:{
        type: Number,
    },

    tests:{
        type: Number,
    },

    positiveTests:{
        type: Number,
    },

    positiveTestsPercentage:{
        type: String,
    },

    severePatients:{
        type: Number,
    },

    moderatelyCondition:{
        type: Number,
    },

    respiratoryPatients:{
        type: Number,
    },
    patientsLocation:{
        type: Object,
    }

},{
    timestamps: true,
})

const Covid19 = mongoose.model('Covid19', covidSchema)

module.exports = Covid19;  