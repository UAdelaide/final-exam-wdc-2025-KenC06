const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  const sql = `
    SELECT
      wr.request_id,
      d.name             AS dog_name,
      wr.requested_time,
      wr.duration_minutes,
      wr.location,
      u.username         AS owner_username
    FROM WalkRequests AS wr
    JOIN Dogs AS d
      ON wr.dog_id = d.dog_id
    JOIN Users AS u
      ON d.owner_id = u.user_id
    WHERE wr.status = 'open'
  `;

  try{
  const [rows] = await pool.query(sql);
  res.json(rows);
 } catch (err) {
  console.error('Error fetching open walk requests', err);
  res.status(500).json({error: 'Failed to fetch open walk request'});
 }
});

module.exports = router;