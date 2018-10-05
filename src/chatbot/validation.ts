import * as Joi from 'joi';

const messagevalidation = {
    message: Joi.string().required(),
    send: Joi.boolean(),
    session_id: Joi.string().required(),
    type: Joi.string(),
  };
export {
    messagevalidation,
};
