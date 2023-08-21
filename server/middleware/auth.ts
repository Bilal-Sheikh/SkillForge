import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

require('dotenv').config();
// console.log('Loaded environment variables:', process.env.SECRET);
export const SECRET = process.env.SECRET;

//JWT Admin Auth
export const authenticateAdminJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, SECRET as string, (err, user) => {
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
                req.headers["email"] = user.email
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
export const authenticateUserJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, SECRET as string, (err, user) => {
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
                req.headers["email"] = user.email
                next();
            } else {
                res.sendStatus(403);
            }
        });
    } else {
        res.sendStatus(401);
    }
}
