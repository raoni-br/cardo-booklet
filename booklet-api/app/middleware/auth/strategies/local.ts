import { Strategy, IVerifyOptions } from 'passport-local';
import createHttpError from 'http-errors';

import { UserModel } from '../../../models/user';

function verifyUser(
    username: string,
    password: string,
    done: (error: any, user?: any, options?: IVerifyOptions) => void,
) {
    if (!UserModel.verifyUser(username, password)) {
        done(createHttpError(400, 'Invalid username/password'), null);
    }

    done(null, username, { message: 'user logged in successfully' });
}
export const localStrategy = new Strategy({ usernameField: 'username', passwordField: 'password' }, verifyUser);
