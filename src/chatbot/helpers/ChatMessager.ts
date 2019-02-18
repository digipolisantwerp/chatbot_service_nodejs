import axios from 'axios';
import { fakeServiceResponse } from '../config';
import { ServiceConfig, ChatbotAccess } from './../types';
export default class ChatMessager {
  private static instance: ChatMessager;
  // Assign "new Singleton()" here to avoid lazy initialisation
  private config: ServiceConfig;
  private authentication: Promise<ChatbotAccess>;
  constructor(config: ServiceConfig) {
    if (ChatMessager.instance
      && ChatMessager.instance.config.chatbot === config.chatbot
      && ChatMessager.instance.config.fakeResponse === config.fakeResponse
    ) {
      return ChatMessager.instance;
    }
    this.config = config;
    ChatMessager.instance = this;
  }

  public sendMessage(message: string, session: string, metadata?: any) {
    if (this.config.fakeResponse) {
      return Promise.resolve(fakeServiceResponse);
    }
    return new Promise<object>((resolve, reject) => {
      axios({
        data: {
          environment: this.config.chatbotenv,
          message,
          metadata,
          session,
        },
        headers: {
          apikey: this.config.apikey,
        },
        method: 'post',
        params: {
          access_token: this.config.accessToken,
        },
        url: `${this.config.serviceUrl}/chats/${this.config.chatbot}/message`,
      }).then((response: any) => {
        return resolve(response.data);
      }).catch((e) => {
        if (e.response && e.response.data && e.response.data.error) {
          const errorObject = {
            ...e.response.data.error,
            name: 'ChatBotError',
          };
          return reject(errorObject);
        }
        const error = {
          ...e.response,
          name: 'ChatBotError',
        };
        return reject(error);
      });
    });
  }
}
