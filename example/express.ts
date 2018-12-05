const bodyParser = require('body-parser');
const cors = require('cors');
const lib = require('../src');
import express = require('express');
import errorHandler from './middleware/error.middle';
import authenticate from './middleware/checktoken.middle';
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
  apikey: process.env.APIKEY,
}));

app.post('/api/chatbot/inject', injectUser, lib.chatbot.createController({
  chatbot: process.env.CHATBOT,
  chatbotenv: process.env.CHATBOT_ENV,
  serviceUrl: process.env.SERVICEURL,
  accessToken: process.env.ACCESSTOKEN,
  apikey: process.env.APIKEY,
}));

app.post('/api/chatbotsecure', authenticate, lib.chatbot.createController({
  chatbot: process.env.CHATBOT,
  chatbotenv: process.env.CHATBOT_ENV,
  serviceUrl: process.env.SERVICEURL,
  accessToken: process.env.ACCESSTOKEN,
  apikey: process.env.APIKEY,
}));

app.use(errorHandler);

export = app ;
