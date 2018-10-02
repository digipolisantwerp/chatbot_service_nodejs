import axios from 'axios';

import { ServiceConfig, ChatbotAccess } from './../types';
export default class ChatMessager{
  private static instance: ChatMessager;
  // Assign "new Singleton()" here to avoid lazy initialisation
  constructor (config: ServiceConfig) {
    if (ChatMessager.instance && ChatMessager.instance.config.chatbot === config.chatbot) {
      return ChatMessager.instance;
    }
    this.config = config;
    ChatMessager.instance = this;
  }
  async sendMessage(message: string, session: string, metadata?: any) {
    return new Promise<object>(async(resolve, reject) => {
      try {
        axios({
          url: `${this.config.serviceUrl}/chats/${this.config.chatbot}/message`,
          method: 'post',
          data: {
            session,
            message,
            metadata,
            environment: this.config.chatbotenv,
          },
          params: {
            access_token: this.config.accessToken,
          },
          headers: {
            apikey: this.config.apikey,
          },
        }).then((response:any) => {
          resolve(response.data);
        }).catch((e) => {
          if (e.response) {
            const errorObject = {
              ...e.response.data.error,
              name: 'ChatBotError',
            };
            return reject(errorObject);
          }
          return reject(e);
        });
      } catch (e) {
        const errorObject = {
          name: 'ChatBotError',
          message: e.message,
          status: e.status,
        };
        reject(errorObject);
      }
    });
  }
  config: ServiceConfig;
  authentication: Promise<ChatbotAccess>
;
}
