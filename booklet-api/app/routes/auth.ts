import express, { Request, Response } from 'express';

export const authRouter = express.Router();

/* POST signup */
authRouter.post('/signup', function (req: Request, res: Response) {
    res.send('respond with a resource');
});

/* POST login */
authRouter.post('/login', function (req: Request, res: Response) {
    res.send('respond with a resource');
});

/* POST logout */
authRouter.post('/logout', function (req: Request, res: Response) {
  res.send('respond with a resource');
});
