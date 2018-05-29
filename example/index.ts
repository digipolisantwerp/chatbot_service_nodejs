require('dotenv-safe').config();
import express = require('express');
import { Request, Response, NextFunction } from 'express';
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const lib = require('../src');
app.use(cors());
app.use(bodyParser.json());

app.post('/api/chatbot', lib.chatbot.createController({
  chatbot: process.env.CHATBOT,
  chatbotenv: process.env.CHATBOT_ENV,
  serviceUrl: process.env.SERVICEURL,
  token: process.env.TOKEN,
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
