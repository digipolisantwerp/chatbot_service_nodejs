import * as app from './../../example/express';
import * as request from 'supertest';
import axios from 'axios';

const mockedErrorWidthResponce = {
  message: 'Request failed with status code 401',
  response:{
    data: {
      error:{
        message: 'Request failed with status code 401',
        name: 'ChatBotError',
      },
    },
  },
};

describe('POST /api/chatbot`', () => {
  describe('Test Call', () => {
    it('Expect The server to respond with a engine error if there is a problem with the call', async () => {
      axios.mockRejectedValueOnce(mockedErrorWidthResponce);
      const { body, status  } = await request(app)
        .post(`/api/chatbot`)
        .send({
          message: 'hello world',
          session_id: 'sessionid',
        });
      expect(status).toEqual(500);
      expect(body).toEqual({
        ...mockedErrorWidthResponce.response.data.error,
        name: 'ChatBotError',
      });
    });
  });
});
