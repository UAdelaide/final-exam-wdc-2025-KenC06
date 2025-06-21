const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', async (requestAnimationFrame,res => {
    if(!req.session.user){
        return res.status(401.json)
    }

}))