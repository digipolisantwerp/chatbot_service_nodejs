const createService = require('./service');

const createController = (config) => {
    const service = createService(config);
    return (req, res, next) => {
        service(req.query.search).then((result) => {
            res.json(result);
        }).catch((error) => {
            next(error);
        });
    }
}

module.exports = createController;
