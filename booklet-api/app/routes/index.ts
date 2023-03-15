// 3rd party imports
import express, { Request, Response } from 'express';

// app imports
import { booksRouter } from './books';
import { authRouter } from './auth';

export const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', function (req: Request, res: Response) {
    res.send('Booklet App');
});

indexRouter.use('/books', booksRouter);
indexRouter.use('/auth', authRouter);
