import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

import { User, UserInput, UserModel } from './user';

interface UserTest {
    input: UserInput;
    user: User;
}

const testDataFilepath = path.join(__dirname, 'data.test.json');
const testUsers: { [key: string]: UserTest } = {
    user1: {
        input: {
            username: 'testUser1',
            password: 'test1234',
        },
        user: {
            username: 'testUser1',
            hashedPassword: '4b5bc93f6b57e6fcfc846b4523dc4f79a2a38019723897c385b1e7bc35a7132b',
            salt: '033637b99fae9ad588cdb5d333bf4f6c',
        },
    },
    user2: {
        input: {
            username: 'testUser2',
            password: 'test1234',
        },
        user: {
            username: 'testUser2',
            hashedPassword: '4b5bc93f6b57e6fcfc846b4523dc4f79a2a38019723897c385b1e7bc35a7132b',
            salt: '033637b99fae9ad588cdb5d333bf4f6c',
        },
    },
    unregistered: {
        input: {
            username: 'unregistered',
            password: 'invalid',
        },
        user: {
            username: 'unregistered',
            hashedPassword: 'none',
            salt: 'none',
        },
    },
};

describe('UserModel', () => {
    describe('verifyUser', () => {
        beforeEach(() => {
            const userDataJSON = JSON.stringify([testUsers['user1'].user, testUsers['user2'].user], null, 2);
            fs.writeFileSync(testDataFilepath, userDataJSON, 'utf8');
        });

        afterAll(() => {
            // delete file
            fs.unlinkSync(testDataFilepath);
        });

        test('user can login with valid password', async () => {
            const result = await new UserModel(testDataFilepath).verifyUser(testUsers['user1'].input);
            expect(result).toBe(true);
        });

        test('Registered user with invalid password cannot login', async () => {
            try {
                await new UserModel(testDataFilepath).verifyUser({
                    username: testUsers['user1'].input.username,
                    password: 'invalid',
                });
            } catch (e) {
                expect(e.status).toBe(400);
                expect(e.message).toBe('Incorrect username or password');
            }
        });

        test('unregister user cannot login', async () => {
            try {
                await new UserModel(testDataFilepath).verifyUser(testUsers['unregistered'].input);
            } catch (e) {
                expect(e.status).toBe(400);
                expect(e.message).toBe('Incorrect username or password');
            }
        });

        test('unregister user cannot login - default db', async () => {
            try {
                await new UserModel().verifyUser(testUsers['user1'].input);
            } catch (e) {
                expect(e.status).toBe(400);
                expect(e.message).toBe('Incorrect username or password');
            }
        });
    });

    describe('registerUser', () => {
        afterEach(() => {
            // delete file
            fs.unlinkSync(testDataFilepath);
        });

        test('New user can be registered in the app', async () => {
            const result = await new UserModel(testDataFilepath).registerUser(testUsers['user1'].input);
            expect(result).toBe(true);
        });

        test('User cannot register with existing username', async () => {
            const result = await new UserModel(testDataFilepath).registerUser(testUsers['user1'].input);
            expect(result).toBe(true);

            try {
                await new UserModel(testDataFilepath).registerUser(testUsers['user1'].input);
            } catch (e) {
                console.log(e);
                expect(e.status).toBe(400);
                expect(e.message).toBe('User already registered');
            }
        });
    });
});
