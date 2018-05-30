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

app.use((err: any, req: Request, res: Response, next:NextFunction) => {
  if (err.name === 'ValidationError') {
    const validationError = {
      title: err.details[0].message,
      message: err.message,
      url: req.originalUrl,
      detail: err.details,
    };
    return res.status(400).send(validationError);
  }
  if (err.name === 'ChatBotError') {
    const status = err.status || 500;
    return res.status(status).send(err);
  }
  return res.status(500).send(err);
});

export = app ;
