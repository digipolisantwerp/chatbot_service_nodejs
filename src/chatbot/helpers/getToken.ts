import axios from 'axios';

import { ChatbotAccess } from './../types';

export default (username: string, password: string, url: string, apikey: string) => {
  return new Promise<ChatbotAccess>(async(resolve, reject) => {
    axios({
      url: `${url}/chats/token`,
      method: 'post',
      headers: { apikey },
      data: {
        password,
        username,
      },
    }).then((response) => {
      resolve(response.data);
    }).catch((e) => {
      if (e.response) {
        const errorObject = {
          ...e.response.data.error,
          message: e.message,
          name: 'ChatBotError',
        };
        return reject(errorObject);
      }
      return reject(e);
    });
  });
};
