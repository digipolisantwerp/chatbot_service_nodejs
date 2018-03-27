'use strict';

const { URL } = require('url');
const OAuth2 = require('oauth').OAuth2;

/**
 * Create a function that obtains an OAuth 2.0 access token from an OAuth2 instance
 * using grant type "client credentials"
 * and caching the token
 * @param {OAuth2} oauth2 
 */
const createAccessTokenFn = () => {
    let accessToken;
    return (oauth2) => {
        if (accessToken) {
            return Promise.resolve(accessToken);
        } else {
            return new Promise((resolve, reject) => {
                oauth2.getOAuthAccessToken(null, {'grant_type': 'client_credentials'}, 
                    (err, token) => {
                        if (err) {
                            reject(err);
                        } else {
                            accessToken = token;
                            resolve(token);    
                        }
                    }
                );
            });
        }
    }
};

/**
 * Perform a request protected by OAuth2, authenticating as necessary.
 * @param {*} config The OAuth2 configuration
 * @param {(...args, accessToken) => Promise<*>} request 
 */
const authenticatedOAuth2 = (config, request) => {
    const {
        clientId,
        clientSecret,
        oauthUrl
    } = config;

    const getAccessToken = createAccessTokenFn();
    const pathname = new URL(oauthUrl).pathname;
    const serverUrl = oauthUrl.substring(0, oauthUrl.indexOf(pathname))
    let oauth2 = new OAuth2(
        clientId,
        clientSecret,
        serverUrl,
        null,
        pathname,
        null
    );
    // retry behavior from: https://stackoverflow.com/a/46112255/20980
    return (...args) => 
        getAccessToken(oauth2)
            .then((token) => request(...args, token))
            .catch((rejection) => {
                if (rejection && rejection.statusCode === 401) {
                    return getAccessToken(oauth2).then(
                        (token) => request(...args, token));
                } else {
                    return Promise.reject(rejection);
                }
            });
}

module.exports = authenticatedOAuth2;
