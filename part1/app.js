const express = require('express');
const pool = require('./db');

const dogsRoute = require('./routes.dogs');
const walkersRoute = require('./routes.walkers');
const walkRequestRoute = require('./routes.walkrequest');

const app = express();
app.s(express.json());

app.use('/api/dogs', dogsRoute);
app.use('/api/walkers/summary', walkersRoute);
app.use('/api/walkrequest/open', walkRequestRoute);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});