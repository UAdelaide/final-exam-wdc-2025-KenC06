const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    try {
        // only the dogs owned by the logged-in user
        const [rows] = await db.query(
            `SELECT dog_id, name
         FROM Dogs
        WHERE owner_id = ?`,
            [req.session.user.user_id]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not fetch dogs' });
    }
});


module.exports = router;