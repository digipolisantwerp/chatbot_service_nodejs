'use strict';

const express = require('express')
require('dotenv').config();

const app = express()

const lib = require('../lib');

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    next();
});

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/antwerpenaars', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let fs = require("fs");
    let index = 0;
    let people = JSON.parse(
        fs.readFileSync("./example/assets/antwerpenaars.json").toString()
    ).map((str) => {
        return { id: index++, name: str };
    });
    let result = people.filter((item) => {
        if (typeof req.query.search === "string") {
            return item.name.toLowerCase().indexOf(req.query.search.toLowerCase()) >= 0;
        } else {
            return false;
        }
    });
    res.send(JSON.stringify(result));
});

const controller = lib.mprofielAdmin.createController({
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    oauthUrl: process.env.MPROFIEL_ADMIN_OAUTH_URL,
    serviceUrl: process.env.MPROFIEL_ADMIN_API_URL
});

app.get('/api/medewerkers', controller);

const port = process.env.PORT || 3000;
app.listen(port, () => 
    console.log('Example app listening on port ' + port + '!'))
