import * as Joi from 'joi';
import * as validation from './validation';
import createService from './service';
import { NextFunction, Request, Response } from 'express';
import { ChatbotMessage, ServiceConfig } from './types';

const createController = (config: ServiceConfig) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = Joi.attempt(
        req.body,
        Joi.object().keys(validation.messagevalidation),
      );
      const service = createService(config);
      const returnMessage = await service(req.body);
      res.json(returnMessage);
    } catch (e) {
      next(e);
    }
  };

const chatService = (config: ServiceConfig) => async (body: ChatbotMessage) => {
  try {
    const service = createService(config);
    return await service(body);
  } catch (e) {
    throw e;
  }
};

export { createController, chatService };
