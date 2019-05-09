import { Request, Response, NextFunction } from 'express';
import { types } from '../../src';

function handleResponse(req: types.ChatbotRequest, res: Response, next: NextFunction) {
  return res.json(req.chatbotResponse);
}
export default handleResponse;
