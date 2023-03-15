interface User {
    username: string;
    password: string; // secret
}

export abstract class UserModel {
    static verifyUser(username: string, password: string): boolean {
        return false;
    }

    static registerUser(username: string, password: string) {}
}
