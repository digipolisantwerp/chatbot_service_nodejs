import axios from 'axios';
import { ServiceConfig, ChatbotMessage } from './types';

export =  (config: ServiceConfig) => async (chatmessage: ChatbotMessage) => {
  return new Promise<object>(async(resolve, reject) => {
    axios({
      url: `${config.serviceUrl}/${config.chatbot}/message`,
      method: 'post',
      data: {
        environment: config.chatbotenv,
        session: chatmessage.session_id,
        message: chatmessage.message,
      },
      params: {
        access_token: config.token,
      },
    }).then((response) => {
      resolve(response.data);
    }).catch((e) => {
      if (e.response) {
        const errorObject = {
          ...e.response.data.error,
          message: 'ChatBotError',
        };
        reject(errorObject);
      }
      reject(e);
    });
  });
};
