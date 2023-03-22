import express, { NextFunction, Request, Response } from 'express';

import { appPassport } from '../middleware/auth/passport';
import { registerUser } from '../controllers/auth';
import { generateToken } from '../middleware/auth/token';

export const authRouter = express.Router();

/* POST signup */
authRouter.post('/signup', registerUser);

/* POST login */
const loginOptions = {
    session: false,
    failureRedirect: '/auth/login',
    failureFlash: true,
};

authRouter.post('/login', appPassport.authenticate('local', loginOptions), async (req, res) => {
    // Create jwt token
    generateToken(res, req.user as string);
    res.status(200).send('user logged in');
});

/* POST logout */
authRouter.post('/logout', function (req: Request, res: Response, next: NextFunction) {
    req.logOut({ keepSessionInfo: false }, function (err) {
        if (err) {
            return next(err);
        }
        res.clearCookie('jwt');
        res.status(200).send('user logged out');
    });
});
