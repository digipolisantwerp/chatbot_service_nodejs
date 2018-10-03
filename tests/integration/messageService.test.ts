import axios from 'axios';
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
  it('Expect repsonse', async () => {
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
});
