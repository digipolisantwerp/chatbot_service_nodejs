import { Request, Response, NextFunction } from 'express';
export default (req: Request, res: Response, next:NextFunction) => {
  // @TODO: Check authentication in a middleware for a secured endpoint
  if (process.env.TOKEN === req.headers['authorization']) {
    return next();
  }
  next({
    message: 'unauthorized',
    status: 401,
  });
};
