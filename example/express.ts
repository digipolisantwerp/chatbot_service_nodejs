const bodyParser = require('body-parser');
const cors = require('cors');
import lib from '../src';
import * as express from 'express';
import errorHandler from './middleware/error.middle';
import authenticate from './middleware/checktoken.middle';
import injectUser from './middleware/injectUser.middle';
import { Request, Response, NextFunction } from 'express';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.post('/api/chatbot', lib.createController({
  accessToken: process.env.ACCESSTOKEN,
  apikey: process.env.APIKEY,
  chatbot: process.env.CHATBOT,
  chatbotenv: process.env.CHATBOT_ENV,
  serviceUrl: process.env.SERVICEURL,
}));

app.post('/api/chatbot/inject', injectUser, lib.createController({
  accessToken: process.env.ACCESSTOKEN,
  apikey: process.env.APIKEY,
  chatbot: process.env.CHATBOT,
  chatbotenv: process.env.CHATBOT_ENV,
  serviceUrl: process.env.SERVICEURL,
}));

app.post('/api/chatbotsecure', authenticate, lib.createController({
  accessToken: process.env.ACCESSTOKEN,
  apikey: process.env.APIKEY,
  chatbot: process.env.CHATBOT,
  chatbotenv: process.env.CHATBOT_ENV,
  serviceUrl: process.env.SERVICEURL,
}));

app.use(errorHandler);

export = app ;
