import * as app from './../../example/express';
import * as request from 'supertest';
import axios from 'axios';

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
describe('POST /api/chatbotsecure`', () => {
  it('Test authenticaton middleware 401', async () => {
    const { body, status  } = await request(app)
      .post(`/api/chatbotsecure`)
      .send({
        message: 'hello world2',
        session_id: 'sessionid',
      });
    expect(status).toEqual(401);
  });
  it('Test authenticaton middleware 200', async () => {
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
      Promise.resolve({
        data: mockedMessage,
      }),
    );
    const { body, status  } = await request(app)
      .post(`/api/chatbotsecure`)
      .set('Authorization', process.env.TOKEN)
      .send({
        message: 'hello world2',
        session_id: 'sessionid',
      });
    expect(status).toEqual(200);
  });
});
