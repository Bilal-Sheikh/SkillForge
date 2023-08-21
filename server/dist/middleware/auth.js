"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUserJwt = exports.authenticateAdminJwt = exports.SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
// console.log('Loaded environment variables:', process.env.SECRET);
exports.SECRET = process.env.SECRET;
//JWT Admin Auth
const authenticateAdminJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, exports.SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (!user) {
                return res.sendStatus(403);
            }
            if (typeof user === 'string') {
                return res.sendStatus(403);
            }
            if (user.role === 'admin') {
                req.headers["email"] = user.email;
                next();
            }
            else {
                res.sendStatus(403);
            }
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateAdminJwt = authenticateAdminJwt;
//JWT User Auth
const authenticateUserJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, exports.SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (!user) {
                return res.sendStatus(403);
            }
            if (typeof user === 'string') {
                return res.sendStatus(403);
            }
            if (user.role === 'user') {
                req.headers["email"] = user.email;
                next();
            }
            else {
                res.sendStatus(403);
            }
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateUserJwt = authenticateUserJwt;
