import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user';

export async function registerUser(req: Request, res: Response, next: NextFunction) {
    try {
        await new UserModel().registerUser({username: req.body.username, password: req.body.password});
        res.send('user created');
    } catch (error) {
        next(error);
    }
}