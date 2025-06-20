const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const [rows] = await pool.query(`
      SELECT d.name   AS dog_name,
             d.size   AS size,
             u.username AS owner_username
      FROM Dogs d
      JOIN Users u
        ON d.owner_id = u.user_id
    `);
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
