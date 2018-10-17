// ============================
// Node Requires
// ============================

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const VerifyToken = require('./VerifyToken');

const express  = require('express');

// ============================
// Express Router Setup
// ============================

const router = express.Router();

// ============================
// Auth Routes
// ============================

router.get('/me', VerifyToken, function(req, res, next) {
    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send({
            error: true,
            message: 'There was a problem finding the user.'
        });

        if (!user) return res.status(404).send({
            error: true,
            message: 'No user found.'
        });

        res.status(200).send(user);
    });
});

router.post('/register', (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    },
    function (err, user) {
        if (err) return res.status(500).send('There was a problem registering the user.');

        var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 //expires in 1hr
        });

        res.status(200).send({ auth: true, token });
    });
});


router.post('/login', (req, res) => {

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 //expires in 1hr
        });

        res.status(200).send({ auth: true, token: token });
    });
});

module.exports = router;