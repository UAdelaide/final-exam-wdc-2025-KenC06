const express = require('express');
const path = require('path');
const session = require('express-session');

require('dotenv').config();
const app = express();

// session
app.use(session({
    secret
    resave: false,
  saveUninitialized: false,
  cookie: {
    // secure: true, // only if you're running HTTPS
    maxAge: 1000 * 60 * 60 // 1 hour
}));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;