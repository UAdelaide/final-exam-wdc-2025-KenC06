const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();

// session middle ware
app.use(session({
    secret: process.env.SESSION_SECRET || 'forsession',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
const allDogsRouter = require('../part1/routes/dog');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
app.use('/api/all-dogs', allDogsRouter);

module.exports = app;
