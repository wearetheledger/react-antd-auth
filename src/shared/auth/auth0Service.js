import auth0 from 'auth0-js';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN, AUTH0_SCOPE } from '@env';
import { setSession } from './authActions';
import jwt_decode from 'jwt-decode';

const client = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: `${window.location.origin}/callback`,
    responseType: 'id_token token',
    scope: AUTH0_SCOPE
});

//https://theledger.eu.auth0.com/authorize?audience=https://theledger.eu.auth0.com/api/v2/&scope=openid profile read:users&response_type=id_token token&client_id=BhcuUfpxPIp1kCHOYw2tFaGVxllby4z9&redirect_uri=http://localhost:3000/callback&nonce=sqdfgfdghfgbdghfjtrdgfgdr&state=sdqfghgfdvfgesfd

export const login = () => {
    client.authorize();
};

export const handleAuthentication = () => {
    return new Promise((resolve, reject) => {
        return client.parseHash(window.location.hash, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                setSession('auth0', authResult.idToken);

                resolve({
                    ...authResult,
                    service: 'auth0'
                });
            } else if (err) {
                console.log('AuthService err');
                console.log(err);
                reject(err);
            }
        });
    });
};

export const getPayload = token => {
    return jwt_decode(token);
};
