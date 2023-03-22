import { Request, Response } from 'express';
import { Strategy, StrategyOptions } from 'passport-jwt';
import jwt from 'jsonwebtoken';

import { UserModel } from '../../models/user';

interface JwtPayload {
    username: string;
}

const jwtStrategyOptions: StrategyOptions = {
    secretOrKey: process.env.BOOKLET_APP_JWT_SECRET,
    passReqToCallback: true,
    jwtFromRequest: cookieExtractor,
};

function cookieExtractor(req: Request) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
}

function getUserByJwtPayload(
    req: Request,
    jwtPayload: JwtPayload,
    // eslint-disable-next-line no-unused-vars
    done: (error: any, username: string) => void,
): void {
    try {
        const userModel = new UserModel();
        const user = userModel.findUser(jwtPayload.username);

        if (user) {
            req.user = user.username;
            done(null, user.username);
        } else {
            done('User not found', null);
        }
    } catch (error) {
        done('Error while authenticating user', null);
    }
}

function generateToken(res: Response, username: string): string {
    const userModel = new UserModel();
    const user = userModel.findUser(username);

    const jwtPayload: JwtPayload = { username: user.username };
    const token = jwt.sign(jwtPayload, process.env.BOOKLET_APP_JWT_SECRET, { expiresIn: '8h' });

    res.cookie('jwt', token, { httpOnly: true, path: '/' });
    return token;
}

const tokenValidation = new Strategy(jwtStrategyOptions, getUserByJwtPayload);

export { tokenValidation, generateToken };
