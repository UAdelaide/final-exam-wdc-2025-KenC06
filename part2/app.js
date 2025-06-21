const express = require('express');
const path = require('path');
const session = require('express-session');
const SESSION_SECRET = 'forsession';

require('dotenv').config();
const app = express();

// session
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
const dogRoutes = require('./routes/dogRoutes');
const allDogsRouter = require('../part1/routes/dog');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dogs', dogRoutes);
app.use('/api/allDogs', allDogsRouter);

// Export the app instead of listening here
module.exports = app;