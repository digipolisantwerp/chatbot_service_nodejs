import * as Joi from 'joi';

const messagevalidation =
  {
    message: Joi.string().required(),
    session_id: Joi.string().required(),
    type: Joi.string().required(),
    send: Joi.boolean().required(),
  };
export {
    messagevalidation,
};
