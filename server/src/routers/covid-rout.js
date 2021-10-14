const express = require("express");
const Covid19 = require("../models/covid-model");
const Cities = require('../models/covid-cities-model');
const Hospitals = require('../models/covid-hospitals-model');
const router = new express.Router();


router.get('/covid/get', async(req, res) => {
    try{
        const data = await Covid19.find({}) 
        if (data.length === 0) {
			return res.status(404).send({
				status: 404,
				message: "no results",
			});
		}
        res.send(data)
    }catch(err){
        res.status(500).send(err);
    }
})


router.get('/get-hospitals-data', async(req, res) => {
    try{
        const data = await Hospitals.find({}) 
        if (data.length === 0) {
			return res.status(404).send({
				status: 404,
				message: "no results",
			});
		}
        res.send(data)
    }catch(err){
        res.status(500).send(err);
    }
})


router.get('/get-cities-data', async(req, res) => {
    try{
        const data = await Cities.find({}) 
        if (data.length === 0) {
			return res.status(404).send({
				status: 404,
				message: "no results",
			});
		}
        res.send(data)
    }catch(err){
        res.status(500).send(err);
    }
})


module.exports = router;