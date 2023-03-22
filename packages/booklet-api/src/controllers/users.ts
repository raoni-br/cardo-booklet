import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user';

export async function getUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new UserModel().findUser(req.user as string);
        res.send({ username: user.username });
    } catch (error) {
        next(error);
    }
}
