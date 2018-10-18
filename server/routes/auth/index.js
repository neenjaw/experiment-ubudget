// ============================
// Node Requires
// ============================

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const VerifyToken = require('./VerifyToken');

const express  = require('express');
const router = express.Router();

const UserAuthorizationState = require('../../models/user-authorization-state');
const User = require('../../models/user');

// ============================
// Auth Routes
// ============================

router.get('/me', VerifyToken, function(req, res, next) {
    // BOOKSHELF
    User.where('user_id', req.userId)
        .fetch()
        .then(function(user) {
            if (!user) return res.status(404).send({
                error: true,
                message: 'No user found.'
            });
    
            res.status(200).send(user);
        })
        .catch(function(err) {
            return res.status(500).send({
                error: true,
                message: 'There was a problem finding the user.'
            });
        });

    // MONGOOSE
    // User.findById(req.userId, { password: 0 }, function (err, user) {
    //     if (err) return res.status(500).send({
    //         error: true,
    //         message: 'There was a problem finding the user.'
    //     });
    // 
    //     if (!user) return res.status(404).send({
    //         error: true,
    //         message: 'No user found.'
    //     });
    // 
    //     res.status(200).send(user);
    // });
});

router.post('/register', (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.userPassword, 8);

    // TODO: get the default user auth state ID
    const defaultUserAuthState = 1;

    const values = {
        user_name: req.body.userName,
        user_email: req.body.userEmail,
        user_password: hashedPassword,
        user_first_name: req.body.userFirstName,
        user_last_name: req.body.userLastName,
        user_authorization_state_id: UserAuthorizationState.getDefaultAuthorizationState()
    };

    User.create(values)
        .save()
        .then(function(user) {
            var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 //expires in 1hr
            });
    
            res.status(200).send({ auth: true, token });
        })
        .catch(function(err) {
            if (err) return res.status(500).send('There was a problem registering the user.');
        });

    // MONGOOSE
    // User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: hashedPassword
    // },
    // function (err, user) {
    //     if (err) return res.status(500).send('There was a problem registering the user.');

    //     var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //         expiresIn: 60 * 60 //expires in 1hr
    //     });

    //     res.status(200).send({ auth: true, token });
    // });
});


router.post('/login', (req, res) => {

    User.where('user_name', req.body.userName)
        .fetch()
        .then(function(user) {
            if (!user) return res.status(404).send('No user found.');

            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 //expires in 1hr
            });
    
            res.status(200).send({ auth: true, token: token });    
        })
        .catch(function(err) {
            if (err) return res.status(500).send('Error on the server.');
        });

    // User.findOne({ email: req.body.email }, (err, user) => {
    //     if (err) return res.status(500).send('Error on the server.');
    //     if (!user) return res.status(404).send('No user found.');
    // 
    //     const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    // 
    //     if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    // 
    //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //         expiresIn: 60 * 60 //expires in 1hr
    //     });
    // 
    //     res.status(200).send({ auth: true, token: token });
    // });
});

module.exports = router;