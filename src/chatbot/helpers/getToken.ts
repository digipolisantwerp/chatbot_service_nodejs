import axios from 'axios';

import { ChatbotAccess } from './../types';

export default (username: string, password: string, url: string) => {
  return new Promise<ChatbotAccess>(async(resolve, reject) => {
    return axios({
      url: `${url}/token`,
      method: 'post',
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
          message: 'ChatBotError Auth',
        };
        reject(errorObject);
      }
      reject(e);
    });
  });
};
