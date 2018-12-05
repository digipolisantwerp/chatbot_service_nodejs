import * as app from './../../example/express';
import * as request from 'supertest';
import axios from 'axios';

const mockedMessage = {
  exited_engine:1527664351.212784,
  entered_engine:1527664351.207196,
  session:'c482f7a2-fdb7-a1d4-e319-edc6d46a00d',
  processed:'5.59 milliseconds',
  data:[
    {
      url:null,
      message:'Hello world 🌍',
      type:'text',
      image:null,
    },
  ],
  id:522803,
  metadata:{
    entities:[],
    estimates:[
      {
        probability:1,
        label:'hello world',
      },
    ],
    label:'hello world',
  },
  time:21,
  reentered_api:1527664351214,
  chatbotName:'testchatbot',
};
describe('POST /api/chatbot`', () => {
  describe('Test Validation', () => {
    it('Expect validation error on missing message', async () => {
      const { body, status  } = await request(app)
        .post(`/api/chatbot`)
        .send({});
      expect(status).toEqual(400);
      expect(body).toEqual({
        title:'\"message\" is required',
        message:[
          {
            message:'"message" is required',
            path:['message'],
            type:'any.required',
            context:{
              key:'message',
              label:'message',
            },
          },
        ],
        url:'/api/chatbot',
        detail:[
          {
            message:'"message" is required',
            path:['message'],
            type:'any.required',
            context:{
              key:'message',
              label:'message',
            },
          },
        ],
      });
    });
    it('Expect validation error on missing session_id', async () => {
      const { body, status  } = await request(app)
        .post(`/api/chatbot`)
        .send({ message: 'hello world' });
      expect(status).toEqual(400);
      expect(body).toEqual({
        title:'\"session_id\" is required',
        message:[
          {
            message:'"session_id" is required',
            path:['session_id'],
            type:'any.required',
            context:{
              key:'session_id',
              label:'session_id',
            },
          },
        ],
        url:'/api/chatbot',
        detail:[
          {
            message:'"session_id" is required',
            path:['session_id'],
            type:'any.required',
            context:{
              key:'session_id',
              label:'session_id',
            },
          },
        ],
      });
    });
  });
  describe('Test Call', () => {
    it('Expect The server to respond when we send it an message', async () => {
      axios.mockImplementationOnce(() =>
        Promise.resolve({
          data: mockedMessage,
        }),
      );
      const { body, status  } = await request(app)
        .post(`/api/chatbot`)
        .send({
          message: 'hello world',
          session_id: 'sessionid',
        });
      expect(axios).toBeCalledWith({
        data: {
          environment: 'production',
          message: 'hello world',
          session: 'sessionid',
        },
        method: 'post',
        params: {
          access_token: 'fake!',
        },
        url: 'https://localhost/chats/123456/message',
        headers: {
          apikey: 'this-is-the-key'
        }
      });

      expect(status).toEqual(200);
      expect(body).toEqual(mockedMessage);
    });
    it('Expect The server to only call the message endpoint and not to regenerate a token', async () => {
      jest.resetModules();
      axios.mockImplementationOnce(() =>
        Promise.resolve({
          data: mockedMessage,
        }),
      );
      const { body, status  } = await request(app)
        .post(`/api/chatbot`)
        .send({
          message: 'hello world2',
          session_id: 'sessionid',
        });
      expect(axios).toBeCalledWith({
        data: {
          environment: 'production',
          message: 'hello world2',
          session: 'sessionid',
        },
        method: 'post',
        params: {
          access_token: 'fake!',
        },
        headers: {
          apikey: 'this-is-the-key'
        },
        url: 'https://localhost/chats/123456/message',
      });

      expect(status).toEqual(200);
      expect(body).toEqual(mockedMessage);
    });
  });
});
