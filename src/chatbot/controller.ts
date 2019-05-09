import * as Joi from 'joi';
import * as validation from './validation';
import createService from './service';
import { NextFunction, Request, Response } from 'express';
import { ChatbotMessage, ServiceConfig, ChatbotRequest } from './types';

const createController = (config: ServiceConfig): any =>
  async (req: ChatbotRequest, res: Response, next: NextFunction) => {
    try {
      const result = Joi.attempt(
        req.body,
        Joi.object().keys(validation.messagevalidation),
      );
      const service = createService(config);
      const returnMessage = await service(req.body);
      if (config.responseHandler === false) {
        req.chatbotResponse = returnMessage;
        return next();
      } else {
        return res.json(returnMessage);
      }
    } catch (e) {
      next(e);
    }
  };

const chatService = (config: ServiceConfig) => async (body: ChatbotMessage) => {
    const service = createService(config);
    return await service(body);
};

export { createController, chatService };
