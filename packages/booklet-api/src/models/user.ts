import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

import createError from 'http-errors';

import { UserInput } from '@cardo-booklet/booklet-utils';

export interface User {
    username: string;
    hashedPassword: string;
    salt: string;
}

export class UserModel {
    private static hashIterations = 310000;
    private static hashKeyLength = 32;
    private static hashAlgorithm = 'sha256';

    private userDataFilePath: string;
    private userData: User[];

    constructor(userDataFilepath: string = null) {
        if (userDataFilepath) {
            this.userDataFilePath = userDataFilepath;
        } else {
            this.userDataFilePath = path.join(__dirname, 'users.json');
        }
        this.readUserDataFile();
    }

    private readUserDataFile() {
        try {
            const jsonUserData = fs.readFileSync(this.userDataFilePath);
            this.userData = JSON.parse(jsonUserData.toString()) || [];
        } catch (error) {
            this.userData = [];
        }
    }

    private static convertFromStringToBuffer(value: string): Buffer {
        return Buffer.from(value, 'hex');
    }

    private static convertFromBufferToString(value: Buffer): string {
        return value.toString('hex');
    }

    public findUser(username: string): User | undefined {
        return this.userData.find((user) => user.username.toLowerCase() === username.toLowerCase());
    }

    public verifyUser(input: UserInput): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const user = this.findUser(input.username);

            if (!user) {
                return reject(createError(400, 'Incorrect username or password'));
            }

            const salt = UserModel.convertFromStringToBuffer(user.salt);
            return crypto.pbkdf2(
                input.password,
                salt,
                UserModel.hashIterations,
                UserModel.hashKeyLength,
                UserModel.hashAlgorithm,
                (err, hashedPassword) => {
                    if (err) {
                        /* c8 ignore start */

                        return reject(err);
                    } /* c8 ignore stop */
                    if (
                        !crypto.timingSafeEqual(
                            UserModel.convertFromStringToBuffer(user.hashedPassword),
                            hashedPassword,
                        )
                    ) {
                        return reject(createError(400, 'Incorrect username or password'));
                    }
                    return resolve(true);
                },
            );
        });
    }

    public registerUser(input: UserInput): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const user = this.findUser(input.username);

            if (user) {
                return reject(createError(400, 'User already registered'));
            }

            const salt = crypto.randomBytes(16);
            return crypto.pbkdf2(
                input.password,
                salt,
                UserModel.hashIterations,
                UserModel.hashKeyLength,
                UserModel.hashAlgorithm,
                (err, hashedPassword) => {
                    if (err) {
                        /* c8 ignore start */
                        return reject(err);
                    } /* c8 ignore stop */

                    const newUser: User = {
                        username: input.username.toLowerCase(),
                        hashedPassword: UserModel.convertFromBufferToString(hashedPassword),
                        salt: UserModel.convertFromBufferToString(salt),
                    };

                    // save new user to file
                    this.userData.push(newUser);
                    const userDataJSON = JSON.stringify(this.userData, null, 2);
                    try {
                        fs.writeFileSync(this.userDataFilePath, userDataJSON, 'utf8');
                    } catch (error) {
                        /* c8 ignore start */
                        console.log(error);
                        return reject(createError(500, 'Error while saving new user to file'));
                    } /* c8 ignore stop */
                    return resolve(true);
                },
            );
        });
    }
}
