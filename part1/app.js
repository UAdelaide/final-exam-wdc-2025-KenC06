const express = require('express');
const pool = require('./db');

const dogRoute = require('./routes.dogs');
const walkeresRoute = require('./routes.walkers');
const walkRequestRoute = require('./routes.walkrequest');

const app = express();
app.s(express.json());

app.use((err,req,res,next) => {



    
})