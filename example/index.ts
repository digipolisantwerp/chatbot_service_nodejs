require('dotenv-safe').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const lib = require('../src');
import express = require('express');
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
}));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send(err);
  }
  if (err.name = 'ChatBotError') {
    return res.status(err.status).send(err);
  }
  return res.status(500).send(err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Example app listening on port ' + port + '!'));

process.on('unhandledRejection', (e) => {
  console.error('unhandledRejection', e.message);
});
