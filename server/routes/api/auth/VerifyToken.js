const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];

    if(!token) {
        return res.status(403).send({
            authenticated: false,
            message: 'No token provided.'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            return res.status(500).send({
                authenticated: false,
                message: 'Failed to authticate token.'
            });
        }

        //if token is authenticated, save the user's id for use later
        req.authenticated = true;
        req.userId = decoded.id;
        req.userRole = decoded.authorizedRole;
        next();
    });
}

module.exports = verifyToken;