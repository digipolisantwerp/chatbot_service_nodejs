import * as Joi from 'joi';
import * as validation from './validation';
import createService = require('./service');
import { Request, Response, NextFunction } from 'express';
import { ServiceConfig, ChatbotMessage } from './types';

const createController = (config: ServiceConfig) =>
  async(req: Request, res: Response, next: NextFunction) => {
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

const chatService = (config: ServiceConfig) => async(body: ChatbotMessage) => {
  const service = createService(config);
  const returnMessage = await service(body);
};
export { createController, chatService };
