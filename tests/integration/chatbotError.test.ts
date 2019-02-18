import * as app from './../../example/express';
import * as request from 'supertest';
import axios from 'axios';

const mockedError = {
  status: 401,
  message: 'Request failed with status code 401',
  name: 'ChatBotError',
};
const mockedErrorWithResponseAndData = {
  message: 'Request failed with status code 401',
  response:{
    data: {
      error:{
        status: 401,
        message: 'Request failed with status code 401',
        name: 'ChatBotError',
      },
    },
  },
};

describe('POST /api/chatbot`', () => {
  describe('Test Call', () => {
    test('Expect The server to respond with a chatbotAutherror if there is a problem with the auth', async () => {
      axios.mockRejectedValueOnce(mockedErrorWithResponseAndData);
      const { body, status  } = await request(app)
        .post(`/api/chatbot`)
        .send({
          message: 'hello world',
          session_id: 'sessionid',
        });
      expect(status).toEqual(401);
      expect(body).toEqual({
        ...mockedErrorWithResponseAndData.response.data.error,
        name: 'ChatBotError',
      });
    });
  });
});

const mockedErrorWithResponse = {
  message: 'Request failed with status code 401',
  response:{
    status: 401,
    message: 'Request failed with status code 401',
    name: 'ChatBotError',
  },
};

describe('POST /api/chatbot`', () => {
  describe('Test Call', () => {
    test('Expect The server to respond with a chatbotAutherror if there is a problem with the auth', async () => {
      axios.mockRejectedValueOnce(mockedErrorWithResponse);
      const { body, status  } = await request(app)
        .post(`/api/chatbot`)
        .send({
          message: 'hello world',
          session_id: 'sessionid',
        });
      expect(status).toEqual(401);
      expect(body).toEqual({
        ...mockedErrorWithResponse.response,
        name: 'ChatBotError',
      });
    });
  });
});
