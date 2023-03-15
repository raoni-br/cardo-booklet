import passport from 'passport';

import { localStrategy } from './strategies/local'

passport.use(localStrategy);

export const appPassport = passport;
