const proxyquire = require('proxyquire');

describe('mprofielAdmin', () => {

    // a mock function that simulates authenticatedOAuth2 from lib/auth
    const oauthPassThrough = 
        (config, request) => (...args) => { return request(null, ...args); }

    const dummyResult = { 
        data: [ {
            id: '0',
            firstName: 'Foo',
            lastName: 'Bar'
        }, {
            id: '1',
            firstName: 'Foo',
            lastName: 'Baz'  
        } ]
    };

    describe('createService', () => {

        it('should attempt to authenticate first', (done) => {
            const createService = proxyquire('../dist/mprofiel-admin/service', { 
                '../auth': {
                    authenticatedOAuth2: (config, request) => () => { done(); }
                }
            });
            const fn = createService({});
            fn();
        });

        it('should query by first and last name', (done) => {
            let byFirstName = false;
            let byLastName = true;
            const query = 'foo';
            const createService = proxyquire('../dist/mprofiel-admin/service', {
                '../auth': { authenticatedOAuth2: oauthPassThrough },
                'request-promise': {
                    get: (url, config) => {
                        if (config.qs.firstName) {
                            expect(config.qs.firstName).toEqual(query);
                            byFirstName = true;
                        }
                        if (config.qs.lastName) {
                            expect(config.qs.lastName).toEqual(query);
                            byLastName = true;
                        }
                        return Promise.resolve(dummyResult);
                    }
                }
            });
            const fn = createService({});
            fn(query).then((result) => {
                expect(result).not.toBeNull();
                expect(result.length).toEqual(2);
                expect(result[0].id).toEqual('0');
                expect(result[0].name).toEqual('Foo Bar');
                expect(result[1].id).toEqual('1');
                expect(result[1].name).toEqual('Foo Baz');
                expect(byFirstName).toBeTruthy();
                expect(byLastName).toBeTruthy();
                done();
            });
        });

        it('should return an empty array when not given a search query', (done) => {
            const createService = proxyquire('../dist/mprofiel-admin/service', { 
                '../auth': { authenticatedOAuth2: oauthPassThrough }
            });
            const fn = createService({});
            fn().then((result) => {
                expect(result).not.toBeNull();
                expect(result.length).toEqual(0);
                done();
            });
        });
        
    });

    describe('createController', () => {
        it('should call the service and output json', (done) => {
            const createController = proxyquire('../dist/mprofiel-admin/controller', {
                './service': () => (search) => {
                    expect(search).toEqual('test');
                    return Promise.resolve(dummyResult);
                }
            });
            const controller = createController({});
            controller({ query: { search: 'test' } }, { json: (result) => { 
                expect(result).toEqual(dummyResult);
                done(); 
            } }, () => {} ); 
        });
    });
});
