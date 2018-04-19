import url = require('url');
import oauth = require('oauth');

/**
 * Create a function that obtains an OAuth 2.0 access token from an OAuth2 instance
 * using grant type "client credentials"
 * and caching the token
 */
function createAccessTokenFn(): (oauth2: oauth.OAuth2, force?: boolean) => Promise<string> {
    let accessToken: string;
    return (oauth2, force = false) => {
        if (accessToken && !force) {
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

export interface OAuthConfig {
    clientId: string,
    clientSecret: string,
    oauthUrl: string
}

/**
 * Perform a request protected by OAuth2, authenticating as necessary.
 */
export function authenticatedOAuth2<T>(
    config: OAuthConfig, 
    request: (accessToken: string, ...args: any[]) => Promise<T>
): (...args: any[]) => Promise<T> {
    const {
        clientId,
        clientSecret,
        oauthUrl
    } = config;

    const getAccessToken = createAccessTokenFn();
    const pathname = new url.URL(oauthUrl).pathname;
    const serverUrl = oauthUrl.substring(0, oauthUrl.indexOf(pathname))
    let oauth2 = new oauth.OAuth2(
        clientId,
        clientSecret,
        serverUrl,
        null,
        pathname,
        null
    );
    // retry behavior from: https://stackoverflow.com/a/46112255/20980
    return (...args: any[]) => 
        getAccessToken(oauth2)
            .then((token) => request(token, ...args))
            .catch((rejection) => {
                if (rejection && rejection.statusCode === 401) {
                    return getAccessToken(oauth2, true).then(
                        (token) => request(token, ...args));
                } else {
                    return Promise.reject(rejection);
                }
            });
}
