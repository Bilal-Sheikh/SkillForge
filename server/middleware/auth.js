const jwt = require('jsonwebtoken');
require('dotenv').config();
// console.log('Loaded environment variables:', process.env.SECRET);


const SECRET = process.env.SECRET;


//JWT Admin Auth
const authenticateAdminJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (user.role === 'admin') {
                req.user = user;
                next();
            } else {
                res.sendStatus(403);
            }
        });
    } else {
        res.sendStatus(401);
    }
}

//JWT User Auth
const authenticateUserJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (user.role === 'user') {
                req.user = user;
                next();
            } else {
                res.sendStatus(403);
            }
        });
    } else {
        res.sendStatus(401);
    }
}

module.exports = {
    authenticateAdminJwt,
    authenticateUserJwt,
    SECRET
}