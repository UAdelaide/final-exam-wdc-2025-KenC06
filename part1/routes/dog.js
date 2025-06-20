const express = require('express');
const pool = require('../db');
const router = express.Router();

const express = require('express');
const pool    = require('../db');
const router  = express.Router();

router.get('/', (req, res) => {
  const sql = `
    SELECT
      d.name       AS dog_name,
      d.size       AS size,
      u.username   AS owner_username
    FROM Dogs d
    JOIN Users u
      ON d.owner_id = u.user_id
  `;
  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching dogs:', err);
      return res.status(500).json({ error: 'Failed to fetch dogs' });
    }
    res.json(results);
  });
});

module.exports = router;
