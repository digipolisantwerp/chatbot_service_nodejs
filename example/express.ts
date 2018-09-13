const bodyParser = require('body-parser');
const cors = require('cors');
const lib = require('../src');
import express = require('express');
import errorHandler from './middleware/error.middle';
import authtenticate from './middleware/checkToken.middle';
import injectUser from './middleware/injectUser.middle';
import { Request, Response, NextFunction } from 'express';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.post('/api/chatbot', lib.chatbot.createController({
  chatbot: process.env.CHATBOT,
  chatbotenv: process.env.CHATBOT_ENV,
  serviceUrl: process.env.SERVICEURL,
  accessToken: process.env.ACCESSTOKEN,
}));

app.post('/api/chatbot/inject', injectUser, lib.chatbot.createController({
  chatbot: process.env.CHATBOT,
  chatbotenv: process.env.CHATBOT_ENV,
  serviceUrl: process.env.SERVICEURL,
  accessToken: process.env.ACCESSTOKEN,
}));

app.post('/api/chatbotsecure', authtenticate, lib.chatbot.createController({
  chatbot: process.env.CHATBOT,
  chatbotenv: process.env.CHATBOT_ENV,
  serviceUrl: process.env.SERVICEURL,
  accessToken: process.env.ACCESSTOKEN,
}));
app.use(errorHandler);

export = app ;
