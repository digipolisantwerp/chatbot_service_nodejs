import * as app from './../../example/express';
import * as request from 'supertest';
import axios from 'axios';

const mockedError = {
  status: 401,
  message: 'Request failed with status code 401',
  name: 'ChatBotError',
};

describe('POST /api/chatbot`', () => {
  describe('Test Call', () => {
    it('Expect The server to respond with te error given from the engine', async () => {
      axios.mockRejectedValueOnce(mockedError);
      const { body, status  } = await request(app)
        .post(`/api/chatbot`)
        .send({
          message: 'hello world',
          session_id: 'sessionid',
        });
      expect(status).toEqual(401);
      expect(body).toEqual(mockedError);
    });
  });
});
