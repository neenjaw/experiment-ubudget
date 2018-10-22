/**
 * 
 * Account backend
 * 
 */

// ==========================
// Node Requires
// ==========================

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const expressSanitizer = require('express-sanitizer');

// ============================
// Express Setup 
// ============================

const app = express();

app.set('port', process.env.PORT || 3000);

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sanitize the incoming body
app.use(expressSanitizer());

// ============================
// Route Includes
// ============================

const authRoutes      = require('./routes/auth/index');
// const userRoutes       = require('./routes/api/user');
// const campgroundRoutes = require('./routes/api/campground');
// const commentRoutes    = require('./routes/api/comment');

// ============================
// Routes
// ============================

app.use(authRoutes);
// app.use('/users', userRoutes);
// app.use('/campgrounds', campgroundRoutes);
// app.use('/campgrounds/:id/comments', commentRoutes);

// ============================
// Server Start / Listen
// ============================

app.listen(app.get('port'), 'localhost', () => {
    console.log(`uBudget API starting on localhost:${app.get('port')}`);
    console.log(`Press ctrl+c or 'kill ${process.pid}' to stop the server.`);
});