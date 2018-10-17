// ============================
// Node Requires
// ============================

const express  = require('express');

// ============================
// Express Router Setup
// ============================

const router = express.Router();

// ============================
// Bookshelf Model Requires
// ============================

const User = require('../../models/user');

// ============================
// Index / Auth Routes
// ============================

// Landing Route
router.get('/', (req, res) => {
    const response = {
        success: true
    };

    res.json(response);
});

function isValidInput(type, input) {
    const types = {
        username: {
            // disable eslint for this line since the string represents an uncompiled regex
            // eslint-disable-next-line no-useless-escape
            pattern: '[a-zA-Z]{1}[a-zA-Z0-9_-]{5,20}'
        },
        password: {
            pattern: '[a-zA-Z0-9]{5,20}'
        },
        displayName: {
            // disable eslint for this line since the string represents an uncompiled regex
            // eslint-disable-next-line no-useless-escape
            pattern: '[a-zA-Z0-9_-]{3,20}'
        }
    };

    if (!(type in types)) {
        return undefined;
    } 

    const re = new RegExp(types[type].pattern);

    return input.match(re);
}

module.exports = router;