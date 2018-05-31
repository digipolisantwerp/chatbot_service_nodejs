const bodyParser = require('body-parser');
const cors = require('cors');
const lib = require('../src');
import express = require('express');
import errorHandler from './middleware/error.middle';
import authtenticate from './middleware/checkToken.middle';
import { Request, Response, NextFunction } from 'express';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.post('/api/chatbot', lib.chatbot.createController({
  chatbot: process.env.CHATBOT,
  chatbotenv: process.env.CHATBOT_ENV,
  serviceUrl: process.env.SERVICEURL,
  username: process.env.CHATBOT_USER,
  password: process.env.CHATBOT_PASS,
  apikey: process.env.APIKEY,
}));

app.post('/api/chatbotsecure', authtenticate, lib.chatbot.createController({
  chatbot: process.env.CHATBOT,
  chatbotenv: process.env.CHATBOT_ENV,
  serviceUrl: process.env.SERVICEURL,
  username: process.env.CHATBOT_USER,
  password: process.env.CHATBOT_PASS,
  apikey: process.env.APIKEY,
}));
app.use(errorHandler);

export = app ;
