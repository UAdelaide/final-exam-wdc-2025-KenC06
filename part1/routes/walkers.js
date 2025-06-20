const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  const sql = `
    SELECT
      u.username          AS walker_username,
      COUNT(r.rating_id)  AS total_ratings,
      AVG(r.rating)       AS average_rating,
      COUNT(
        CASE
          WHEN wa.status='accepted'
           AND wr.status='completed'
        THEN 1 END
      )                    AS completed_walks
    FROM Users u
    LEFT JOIN WalkRatings      r  ON u.user_id = r.walker_id
    LEFT JOIN WalkApplications wa ON u.user_id = wa.walker_id
    LEFT JOIN WalkRequests     wr ON wa.request_id = wr.request_id
    WHERE u.role = 'walker'
    GROUP BY u.username
  `;
  try{
  const [rows] = await pool.query(sql);
  res.json(rows);
 } catch (err) {
  console.error('Error fetching dogs', err);
  res.status(500).json({error: 'Failed to fetch dogs'});
 }
});

module.exports = router;