import { AUTH_LOADING, AUTH_LOGIN, AUTH_LOGOUT } from './authActionTypes';
import { onSuccess } from '../reduxMiddlewareHelper';

const initalState = {
    loading: false,
    authenticated: false,
    user: {
        roles: [],
        sub: null
    },
    jwtToken: null,
    accessToken: null
};

export default function(state = initalState, action) {
    const { payload } = action;

    switch (action.type) {
        case AUTH_LOADING:
            return {
                ...state,
                loading: true
            };
        case AUTH_LOGIN:
        case onSuccess(AUTH_LOGIN):
            return {
                ...state,
                loading: false,
                authenticated: true,
                jwtToken: payload.idToken,
                accessToken: payload.accessToken,
                user: payload.idTokenPayload
            };
        case AUTH_LOGOUT:
            return initalState;
        default:
            return state;
    }
}
