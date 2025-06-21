const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', async (req,res) => {
    if(!req.session.user){
        return res.status(401).json({error: 'Not authenticated'});
    }
}
try {

const[ rows ] = await db.query(
    `SELECT dog_id, name
         FROM Dogs
        WHERE owner_id = ?`,
      [req.session.user.user_id]
);
res.json(rows);
}catch(err){
    console.error(err);
    res.status(500).json({error: 'unable to fetch dogs'})
}