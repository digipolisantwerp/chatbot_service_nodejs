import * as app from './../../example/express';
import * as request from 'supertest';
import axios from 'axios';

const mockedMessageData = {
  exited_engine:1528201675.2203,
  entered_engine:1528201675.116246,
  session:'sdfsdfdd',
  processed:'104.05 milliseconds',
  data:[{url:null,
    message:'{"firstName": u"jasper"}chatid',
    type: 'text',
    image:null}],
  id:905475,
  metadata:{
    entities:[],
    estimates:[
      {
        probability:0.8148148148148148,
        label:'dataint',
      },
      {
        probability:0.11764705882352947,
        label:'Hallo',
      },
      {
        probability:0.04761904761904764,
        label:'testint',
      },
      {
        probability:0.04761904761904764,
        label:'initintentie',
      },
    ],
    label:'dataint',
  },
  time:107,
  reentered_api:1528201675221,
  chatbotName:'Chatbot example',
};
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
describe('POST /api/chatbot/inject`', () => {
  describe('Test Call', () => {
    it('Expect The server to respond with an error', async () => {
      axios.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            id:'fake!',
            ttl:315569260000000,
            created:'2017-04-27T11:31:18.147Z',
            userId:'myid',
          },
        }),
      ).mockImplementationOnce(() =>
        Promise.reject({
          data: mockedMessageData,
        }),
      ).mockImplementationOnce(() =>
        Promise.resolve({
          data: mockedMessage,
        }),
      );
      const { body, status  } = await request(app)
        .post(`/api/chatbot/inject`)
        .send({
          message: 'hello world',
          session_id: 'hello',
        });
      expect(status).toEqual(500);
    });
  });
});
