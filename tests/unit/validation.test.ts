import * as Joi from 'joi';
import { messagevalidation as schema } from '../../src/chatbot/validation';

const defaultMessage = {
  message: 'x',
  meta: {
    x: '1',
  },
  send: true,
  session_id: '11111',
  type: 'mytype',
};

const hasError = (obj, key, mergeWithDefault = true) => {
  const input = mergeWithDefault ? Object.assign({}, defaultMessage, obj) : obj;
  const { error } = Joi.validate(input, schema);
  return error && error.details.some((detail) => {
    return detail.context.key === key;
  });
};

describe('Body validation', () => {
  describe('Message validation', () => {
    it('should be valid on a string', () => {
      expect(hasError({ message: 'x' }, 'message')).toBeFalsy();
    });
    it('should be invalid on no string', () => {
      expect(hasError({ message: 1 }, 'message')).toBeTruthy();
    });
    it('should be invalid if not provided', () => {
      expect(hasError({
        meta: {
          x: '1',
        },
        send: true,
        session_id: '11111',
        type: 'mytype',
      }, 'message', false)).toBeTruthy();
    });
  });

  describe('send validation', () => {
    it('should be valid on a boolean', () => {
      expect(hasError({ send: true }, 'send')).toBeFalsy();
    });
    it('should be invalid on no boolean', () => {
      expect(hasError({ send: 'x' }, 'send')).toBeTruthy();
    });
  });

  describe('session_id validation', () => {
    it('should be valid on a string', () => {
      expect(hasError({ session_id: 'x' }, 'session_id')).toBeFalsy();
    });
    it('should be invalid on no string', () => {
      expect(hasError({ session_id: 1 }, 'session_id')).toBeTruthy();
    });
    it('should be invalid if not provided', () => {
      expect(hasError({
        message: 'x',
        meta: {
          x: '1',
        },
        send: true,
        type: 'mytype',
      }, 'session_id', false)).toBeTruthy();
    });
  });

  describe('type validation', () => {
    it('should be valid on a string', () => {
      expect(hasError({ type: 'x' }, 'type')).toBeFalsy();
    });
    it('should be invalid on no string', () => {
      expect(hasError({ type: 1 }, 'type')).toBeTruthy();
    });
  });

  describe('meta validation', () => {
    it('should be valid on a object', () => {
      expect(hasError({ metadata: { x: 1 } }, 'metadata')).toBeFalsy();
    });
    it('should be invalid on no object', () => {
      expect(hasError({ metadata: true }, 'metadata')).toBeTruthy();
    });
  });

});
