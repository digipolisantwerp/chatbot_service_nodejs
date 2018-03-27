'use strict';

const rp = require('request-promise-any')
const authenticatedOAuth2 = require('./auth');

const mapResultItem = (item) => {
    return { 
        id: item.id,
        name: item.firstName + ' ' + item.lastName,
        firstName: item.firstName,
        lastName: item.lastName,
        userName: item.userName,
        email: item.emailWork,
        domain: item.domain,
        avatarUrl: item.avatarUrl
    };
}
const mapResult = (result) => 
    result.data.map(mapResultItem).sort(sortByNameFn);

const getFirstWord = (str) => (str || '').split(' ')[0];
const sortByNameFn = (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase());

/**
 * Create a function that calls the mprofiel-admin service and finds contacts
 * matching a search string
 * @param {*} config 
 * @return (search) => Promise<Array<ContactItem>>
 */
const createMprofielAdminService = (config) => {
    const getContacts = (search, accessToken) => {
        if (!search) return Promise.resolve([]);

        // we must query twice, since the API does not support firstName OR lastName searches
        const searchFirstName = 
            rp.get(config.serviceUrl, {
                auth: { bearer: accessToken },
                json: true,
                qs: {
                    firstName: getFirstWord(search)
                }
            })
            .then(mapResult)
            // filter on whole name matches since we only searched on the first word
            .then(
                (items) => items.filter(
                    (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) === 0
                )
            );
        const searchLastName = 
            rp.get(config.serviceUrl, {
                auth: { bearer: accessToken },
                json: true,
                qs: {
                    lastName: search
                }
            })
            .then(mapResult);
        return Promise.all([searchFirstName, searchLastName]).then((values) => {
            const [byFirstName, byLastName] = values;
            // try to find an exact match first
            if (byFirstName.length && 
                (byFirstName[0].name.toLowerCase() === search.toLowerCase())) {
                return byFirstName;
            }
            // combine the results, but filter for uniques
            const byFirstNameIds = {};
            byFirstName.forEach((item) => byFirstNameIds[item.id] = true);
            const byLastNameUnique = byLastName.filter((item) => !byFirstNameIds[item.id]);
            return byFirstName.concat(byLastNameUnique).sort(sortByNameFn);
        });
    }
    return authenticatedOAuth2(config, getContacts);
}

module.exports = createMprofielAdminService
