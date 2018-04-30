import request from './request';

function register({ privateKey, publicKey, metadata }) {
    return request({
        url: `/auth/register`,
        method: 'POST',
        data: {
            privateKey,
            publicKey,
            metadata
        }
    });
}

function login({ privateKey, publicKey }) {
    return request({
        url: '/auth/login',
        method: 'POST',
        data: {
            privateKey,
            publicKey
        }
    });
}

function logout({ privateKey, publicKey }) {
    return request({
        url: '/auth/logout',
        method: 'POST',
        data: {
            privateKey,
            publicKey
        }
    });
}

const AuthService = {
    register,
    login,
    logout
};

export default AuthService;
