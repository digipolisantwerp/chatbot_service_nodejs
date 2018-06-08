import { Request, Response, NextFunction } from 'express';
import { sessionHasBeenInjected, addSession } from '../helpers/sessionCheck';
const lib = require('../../src');

export default (req: Request, res: Response, next: NextFunction) => {
  if (!sessionHasBeenInjected(req.body.session_id)) {
    const chatService = lib.chatbot.chatService({
      chatbot: process.env.CHATBOT,
      chatbotenv: process.env.CHATBOT_ENV,
      serviceUrl: process.env.SERVICEURL,
      username: process.env.CHATBOT_USER,
      password: process.env.CHATBOT_PASS,
      apikey: process.env.APIKEY,
    });
    // @TODO: Add your user from the session here
    return chatService({
      session_id: req.body.session_id,
      message: 'Injectdataintouser',
      metadata: {
        firstname: 'jasper',
      },
    }).then((response:any) => {
      addSession(req.body.session_id);
      next();
    }).catch((e: any) => {
      next(e);
    });
  }
  next();
};
