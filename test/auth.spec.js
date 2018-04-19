const proxyquire = require('proxyquire');

describe('authentication', () => {

    it('should authenticate against oauth and relay the token', (done) => {

        let getTokenCalled = 0;
        class MockOAuth2 {
            getOAuthAccessToken(code, params, callback) {
                getTokenCalled++;
                callback(null, 'test');
            }
        }

        const { authenticatedOAuth2 } = proxyquire('../dist/auth', {
            'oauth': {
                OAuth2: MockOAuth2
            }
        });
        let handler = authenticatedOAuth2({
            oauthUrl: 'http://example.com/oauth'
        }, (token, callback) => {
            callback(token);
            return "result";
        });
        handler((token) => {
            expect(token).toEqual('test');
            expect(getTokenCalled).toEqual(1);
            // call again, this time we don't expect the token to occur
            handler((token) => {
                expect(token).toEqual('test');                
                expect(getTokenCalled).toEqual(1);
            }).then((result) => {
                // now check the promise returned the result
                expect(result).toEqual("result");  
                done();
            });
        });
    });

    it('should fail the promise after an error', (done) => {
        class MockOAuth2 {
            getOAuthAccessToken(code, params, callback) {
                callback(new Error("test error"));
            }
        }

        const { authenticatedOAuth2 } = proxyquire('../dist/auth', {
            'oauth': {
                OAuth2: MockOAuth2
            }
        });
        let handler = authenticatedOAuth2({
            oauthUrl: 'http://example.com/oauth'
        }, () => {});
        handler().catch((error) => {
            expect(error.message).toEqual("test error");
            done();
        });
    });

});
