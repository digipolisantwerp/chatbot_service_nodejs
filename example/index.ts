import express = require('express')
require('dotenv').config();
const cors = require('cors');
const { isArray  } = require('lodash');

import { Request, Response, NextFunction } from 'express';
const app = express()

const lib = require('../src');
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    next();
});
app.use(cors())
app.use(express.json());
app.post('/api/chatbot/afvalstickers', lib.chatbot.createController({
   // clientId: process.env.OAUTH_CLIENT_ID,
    // clientSecret: process.env.OAUTH_CLIENT_SECRET,
    oauthUrl: 'https://fake.be',
    serviceUrl: process.env.SERVICEURL
}));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Example app listening on port ' + port + '!'))

// eslint-disable-next-line no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log('@@@@@@@@@@@@@@@@@@@@@');
    console.log('err', err);
    console.log('@@@@@@@@@@@@@@@@@@@@@');
    if (err.name === 'ValidationError') {
        return res.status(400).send(err);
    }
    return res.status(500).send(err);
});

process.on('unhandledRejection', (e) => {
    console.error('unhandledRejection', e.message);
});
