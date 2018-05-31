import { Request, Response, NextFunction } from 'express';
export default (err: any, req: Request, res: Response, next:NextFunction) => {
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
  if (err.status) {
    return res.status(err.status).send(err);
  }
  return res.status(500).send(err);
};
