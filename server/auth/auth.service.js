import crypto from 'crypto';
import Promise from 'bluebird';

export default class AuthService {
    static hashUsersPassword(user) {
        return AuthService.makeSalt()
            .then((salt) => {
                user.salt = salt.toString();
                return AuthService.encryptPassword(salt, user.password);
            })
            .then((hashedPassword) => {
                user.password = hashedPassword;
                return user;
            });
    }

    static makeSalt() {
        const byteSize = 16;
        return Promise.resolve(crypto.randomBytes(byteSize).toString('base64'));
    }


    static encryptPassword(salt, password) {
        if (!password || !salt) {
            return Promise.reject();
        }

        const defaultIterations = 10000;
        const defaultKeyLength = 64;
        const defaultDigest = 'sha512';
        const bufferSalt = new Buffer(salt, 'base64');

        return Promise.resolve(
            crypto.pbkdf2Sync(password, bufferSalt, defaultIterations, defaultKeyLength, defaultDigest)
                .toString('base64'));
    }
}