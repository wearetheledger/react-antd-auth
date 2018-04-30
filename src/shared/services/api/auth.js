import request from './request';

function getUserData({ token }) {
    return request({
        url: `/auth/civic`,
        method: 'POST',
        data: {
            token
        }
    });
}

const AuthService = {
    getUserData
};

export default AuthService;
