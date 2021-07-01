const express = require('express')
const cors = require('cors')
const path = require('path');

const covidRout = require('./routers/covid-rout')
const port = process.env.PORT
require('./db/mongoose')


const app = express()

app.use(express.json())
app.use(cors())
app.use(covidRout)

app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
    console.log('server connected, port:', port)
})