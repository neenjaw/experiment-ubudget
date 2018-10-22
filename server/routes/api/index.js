// ============================
// Node Requires
// ============================

const express  = require('express');

// ============================
// Express Router Setup
// ============================

const router = express.Router();

// ============================
// ObjectionJS Model Requires
// ============================

const { UserAuthorizationRole, User }  = require('../../models/schema');

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
    const validationTypes = {
        username: {
            pattern: /[a-zA-Z]{1}[a-zA-Z0-9_-]{4,20}/
        },
        password: {
            pattern: /[a-zA-Z0-9]{5,20}/
        },
        displayName: {
            pattern: /[a-zA-Z0-9_-]{3,20}/
        }
    };

    if (!(type in validationTypes)) {
        return undefined;
    } 

    return input.match(validationTypes[type].pattern);
}

module.exports = router;