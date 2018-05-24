import createService = require('./service');
import { ServiceConfig, ChatbotMessage } from './types';
import { Request, Response, NextFunction } from 'express';

const createController = (config: ServiceConfig) => {
    const service = createService(config);
    return (req: Request, res: Response, next: NextFunction) => {
        service(req.query.search).then((result: ChatbotMessage[]) => {
            res.json(result);
        }).catch((error: any) => {
            next(error);
        });
    }
}

export = createController;
