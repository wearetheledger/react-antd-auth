import * as auth0Service from './auth0Service';
import * as civicService from './civicService';
import { AUTH_LOGIN, AUTH_LOGOUT } from './authActionTypes';
import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';

export const init = () => {
    return dispatch => {
        const idToken = localStorage.getItem('id_token');

        if (idToken) {
            const [service, token] = idToken.split(':');
            
            let idTokenPayload;

            switch (service) {
                case 'auth0':
                    idTokenPayload = auth0Service.getPayload(token);
                    break;
                case 'civic':
                    idTokenPayload = civicService.getPayload(token);
                    break;
                default:
                    localStorage.removeItem('id_token');
                    throw new Error('Not implemented');
            }

            if (new Date().getTime() > new Date(idTokenPayload.exp * 1000)) {
                auth0Service.logout();
            } else {
                dispatch({
                    type: AUTH_LOGIN,
                    payload: {
                        idToken,
                        idTokenPayload
                    }
                });
            }
        }
    };
};

export const login = service => {
    return dispatch => {
        switch (service) {
            case 'auth0':
                return dispatch(auth0Service.login());
            case 'civic':
                return dispatch(civicService.login());
            default:
                throw new Error('Not implemented');
        }
    };
};

export const handleCallback = () => {
    return dispatch => {
        dispatch({
            type: AUTH_LOGIN,
            payload: auth0Service.handleAuthentication()
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
        localStorage.removeItem('id_token');
        dispatch({ type: AUTH_LOGOUT });
        dispatch(push('/'));
    };
}

export const setSession = (service, idToken) => {
    localStorage.setItem('id_token', `${service}:${idToken}`);
};
