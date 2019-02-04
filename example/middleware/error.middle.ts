import { Request, Response, NextFunction } from 'express';
import * as util from 'util'; // https://stackoverflow.com/a/18354289/20980
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
    return res.status(status).send(util.inspect(err));
  }
  if (err.status) {
    return res.status(err.status).send(util.inspect(err));
  }
  return res.status(500).send(util.inspect(err));
};
