// ============================
// Node Requires
// ============================

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const VerifyToken = require('./VerifyToken');

const express  = require('express');
const router = express.Router();

const { UserAuthorizationRole, User } = require('../../models/schema');

// ============================
// Auth Routes
// ============================

router.get('/me', VerifyToken, function(req, res, next) {
    User.query().first().where({ user_name: req.userName })
        .then(user => {
            if (!user) return res.status(404).send({
                error: true,
                message: 'No user found.'
            });

            res.status(200).send({
                data: [ user ],
                message: 'Success.'
            });
        })
        .catch(error => {
            return res.status(500).send({
                error: true,
                message: 'There was a problem finding the user.'
            });
        });
});

router.post('/register', (req, res) => {
    const newUserValues = {
        user_name: req.body.userName,
        user_email: req.body.userEmail,
        user_password: req.body.userPassword,
        user_first_name: req.body.userFirstName,
        user_last_name: req.body.userLastName,
    };

    User.query()
        .insert(newUserValues)
        .then(newUser => {
            const token = newUser.getToken();

            res.status(200).send({ authenticated: true, token });
        })
        .catch(err => {
            if (err) return res.status(500).send('There was a problem registering the user.');
        });
});


router.post('/login', (req, res) => {
    User.query()
        .first()
        .where({ user_email: req.body.userEmail })
        .then(user => {
            if (!user) return res.status(404).send({ authenticated: false });

            const passwordIsValid = user.verifyPassword(req.body.userPassword);

            if (!passwordIsValid) return res.status(401).send({ authenticated: false });

            return res.status(200).send({ authenticated: true, token: user.getToken() });

        })
        .catch(err => {
            if (err) return res.status(500).send({ 
                error: true, 
                message: 'Error on the server.'
            });
        });
});

module.exports = router;