import * as authService from './authService';
import { AUTH_LOGIN, AUTH_LOGOUT } from './authActionTypes';
import jwt_decode from 'jwt-decode';
import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';

export const init = () => {
    return dispatch => {
        const accessToken = localStorage.getItem('access_token');
        const idToken = localStorage.getItem('id_token');

        if (accessToken && idToken) {
            let idTokenPayload = jwt_decode(idToken);

            if (new Date().getTime() > new Date(idTokenPayload.exp * 1000)) {
                authService.logout();
            } else {
                dispatch({
                    type: AUTH_LOGIN,
                    payload: {
                        idToken,
                        accessToken,
                        idTokenPayload
                    }
                });
            }
        }
    };
};

export const login = () => {
    return dispatch => authService.login();
};

export const handleCallback = () => {
    console.log('handle callback');
    return dispatch => {
        dispatch({
            type: AUTH_LOGIN,
            payload: authService.handleAuthentication()
        })
            .then(() => {
                dispatch(push('/'));
            })
            .catch(err => {
                console.log(err);
                toastr.error(err.error, err.errorDescription);
                dispatch(push('/login'));
            });
    };
};

export function logout() {
    return dispatch => {
        authService.logout();
        dispatch({ type: AUTH_LOGOUT });
        dispatch(push('/'));
    };
}
