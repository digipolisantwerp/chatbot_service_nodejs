import * as request from 'supertest';
import axios from 'axios';
import * as responsehandler from './../../example/middleware/responsehandler.middle';
let spy;
let app;
describe('POST /api/chatbotresponsehandler`', () => {
  beforeAll(() => {
    spy = jest.spyOn(responsehandler, 'default');
    app = require('./../../example/express');
  });
  describe('Test alternative response handler', () => {
    it('Expect response to be send from responsehandler', async () => {
      const { body, status  } = await request(app)
        .post(`/api/chatbotresponsehandler`)
        .send({
          message: 'hello world',
          session_id: 'sessionid',
        });
      expect(status).toEqual(200);
      expect(spy).toBeCalled();
    });
  });
});
