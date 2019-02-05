import { Request, Response, NextFunction } from 'express';
// some errors have circular references, avoid errors when encoding them
import {stringify} from '../helpers/circularJson';
export default (err: any, req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json');
  if (err.name === 'ValidationError') {
    const validationError = {
      detail: err.details,
      message: err.details,
      title: err.details[0].message,
      url: req.originalUrl,
    };
    return res.status(400).send(validationError);
  }
  if (err.name === 'ChatBotError') {
    const status = err.status || 500;
    return res.status(status).send(stringify(err));
  }
  if (err.status) {
    return res.status(err.status).send(stringify(err));
  }
  return res.status(500).send(stringify(err));
};
