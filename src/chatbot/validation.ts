import * as Joi from 'joi';

const messagevalidation =
  {
    message: Joi.string().required(),
    session_id: Joi.string().required(),
    type: Joi.string(),
    send: Joi.boolean(),
  };
export {
    messagevalidation,
};
