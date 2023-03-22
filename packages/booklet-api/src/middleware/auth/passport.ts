import passport from 'passport';

import { localStrategy } from './strategies/local'
import { tokenValidation } from './token';

passport.use(localStrategy);
passport.use(tokenValidation);

export const appPassport = passport;
