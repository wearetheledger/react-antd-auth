import auth0 from 'auth0-js';
import {
    AUTH0_AUDIENCE,
    AUTH0_CLIENT_ID,
    AUTH0_DOMAIN,
    AUTH0_SCOPE
} from '@env';

const client = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: `${window.location.origin}/callback`,
    responseType: 'id_token token',
    scope: AUTH0_SCOPE,
    nonce: 'somethingreallyreallyspecial'
    //audience: 'https://tld-blockchaingers.eu.auth0.com/userinfo'
});

//https://theledger.eu.auth0.com/authorize?audience=https://theledger.eu.auth0.com/api/v2/&scope=openid profile read:users&response_type=id_token token&client_id=BhcuUfpxPIp1kCHOYw2tFaGVxllby4z9&redirect_uri=http://localhost:3000/callback&nonce=sqdfgfdghfgbdghfjtrdgfgdr&state=sdqfghgfdvfgesfd

export const login = () => {
    console.log(AUTH0_SCOPE);
    client.authorize();
};

export const handleAuthentication = () => {
    return new Promise((resolve, reject) => {
        return client.parseHash(window.location.hash, (err, authResult) => {
            console.log(authResult);
            console.log(client);
            if (authResult && authResult.accessToken && authResult.idToken) {
                setSession(authResult);
                console.log('Session set');
                resolve(authResult);
            } else if (err) {
                console.log('AuthService err');
                console.log(err);
                reject(err);
            }
        });
    });
};

export const setSession = authResult => {
    const scopes = authResult.scope || AUTH0_SCOPE || '';

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('scopes', JSON.stringify(scopes));
};

export const logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('scopes');
};
