import express, { Request, Response } from 'express';

import { appPassport } from '../middleware/auth/passport';
import { registerUser } from '../controllers/auth';

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
  // // Create jwt token
  // const token = await generateToken(res, user, rememberMe);
  res.status(200).send('user logged in');
});

/* POST logout */
authRouter.post('/logout', function (req: Request, res: Response) {
  // req.logout(function(err) {
  //   if (err) { return next(err); }
  //   res.redirect('/');
  // });

  res.redirect('/');
});
