import AuthService from '../services/api/auth';
import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import { AUTH_LOGIN } from './authActionTypes';
import { setSession } from './authActions';
import { CIVIC_APP_ID } from '@env';
import jwt_decode from 'jwt-decode';

const civicSip = new window.civic.sip({ appId: CIVIC_APP_ID });

export const login = () => {
    return dispatch => {
        civicSip.signup({
            style: 'popup',
            scopeRequest: civicSip.ScopeRequests.BASIC_SIGNUP
        });

        civicSip.on('auth-code-received', event => {
            dispatch(handleCallback(event.response));
        });
    };
};

export const handleCallback = token => {
    return dispatch => {
        dispatch({
            type: AUTH_LOGIN,
            payload: AuthService.getUserData({ token }).then(
                ({ access_token }) => {
                    setSession('civic', access_token);

                    return {
                        idTokenPayload: getPayload(access_token),
                        idToken: access_token,
                        service: 'civic'
                    };
                }
            )
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

export const getPayload = token => {
    const jwtObject = jwt_decode(token);

    return {
        ...jwtObject,
        name: jwtObject['contact.personal.email'].value
    };
};
