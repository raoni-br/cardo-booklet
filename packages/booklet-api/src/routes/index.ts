// 3rd party imports
import express, { Request, Response } from 'express';

// app imports
import { appPassport } from '../middleware/auth/passport';
import { booksRouter } from './books';
import { authRouter } from './auth';
import { profileRouter } from './profile';


export const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', function (req: Request, res: Response) {
    res.send('Booklet App');
});

const authenticateOptions = { session: false, passReqToCallback: true };

indexRouter.use('/books', appPassport.authenticate('jwt', authenticateOptions), booksRouter);
indexRouter.use('/profile', appPassport.authenticate('jwt', authenticateOptions), profileRouter);
indexRouter.use('/auth', authRouter);
