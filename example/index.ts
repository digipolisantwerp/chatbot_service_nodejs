import express = require('express')
require('dotenv').config();

const app = express()

const lib = require('../src');

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    next();
});

app.post('/api/chatbot/afvalstickers', lib.chatbotService.createController({
    // clientId: process.env.OAUTH_CLIENT_ID,
    // clientSecret: process.env.OAUTH_CLIENT_SECRET,
    // oauthUrl: process.env.MPROFIEL_ADMIN_OAUTH_URL,
    // serviceUrl: process.env.MPROFIEL_ADMIN_API_URL
}));

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log('Example app listening on port ' + port + '!'))
