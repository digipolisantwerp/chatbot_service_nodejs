import axios from 'axios';
import { fakeServiceResponse } from '../../src/chatbot/config';
const lib = require('../../src');

const mockedMessage = { exited_engine:1527664351.212784,
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
        label:'hello word',
      },
    ],
    label:'hello word',
  },
  time:21,
  reentered_api:1527664351214,
  chatbotName:'testchatbot',
};
describe('ChatService', () => {
  test('Expect repsonse', async () => {
    axios.mockImplementationOnce(() =>
      Promise.resolve({
        data: mockedMessage,
      }),
    );
    const chatService = lib.chatbot.chatService({
      chatbot: process.env.CHATBOT,
      chatbotenv: process.env.CHATBOT_ENV,
      serviceUrl: process.env.SERVICEURL,
      accessToken: process.env.ACCESSTOKEN,
      apikey: process.env.APIKEY
    });
    return chatService({
      session_id: 'abc',
      message: 'Injectdataintouser',
      metadata: {
        firstname: 'jasper',
      },
    }).then((response) => {
      expect(response).toEqual(mockedMessage);
    });
  });
  test('Expect error', async () => {
    axios.mockImplementationOnce(() =>
      Promise.reject({
        response: {status: 403} ,
      }),
    );
    const chatService = lib.chatbot.chatService({
      accessToken: process.env.ACCESSTOKEN,
      apikey: process.env.APIKEY,
      chatbot: process.env.CHATBOT,
      chatbotenv: process.env.CHATBOT_ENV,
      serviceUrl: process.env.SERVICEURL,
    });
    return chatService({
      message: 'Injectdataintouser',
      metadata: {
        firstname: 'jasper',
      },
      session_id: 'abc',
    }).catch((e) => {
      expect(e).toEqual({
        name: 'ChatBotError',
        status: 403,
      });
    });
  });
  test('Expect fake response', async () => {
    delete require.cache[require.resolve('../../src')];
    const library = require('../../src');
    const chatService = library.chatbot.chatService({
      accessToken: process.env.ACCESSTOKEN,
      apikey: process.env.APIKEY,
      chatbot: process.env.CHATBOT,
      chatbotenv: process.env.CHATBOT_ENV,
      fakeResponse: true,
      serviceUrl: process.env.SERVICEURL,
    });
    return chatService({
      message: 'Injectdataintouser',
      metadata: {
        firstname: 'jasper',
      },
      session_id: 'abc',
    }).then((response) => {
      expect(response).toEqual(fakeServiceResponse);
    });
  });
});
