import axios from 'axios';
import getToken from './getToken';

import { ServiceConfig, ChatbotAccess } from './../types';
export default class ChatMessager{
  private static instance: ChatMessager;
  // Assign "new Singleton()" here to avoid lazy initialisation
  constructor (config: ServiceConfig) {
    if (ChatMessager.instance) {
      return ChatMessager.instance;
    }
    this.config = config;
    this.authentication = getToken(config.username, config.password, config.serviceUrl);
    ChatMessager.instance = this;
  }
  private async getAccessToken() {
    const { id } = await this.authentication;
    return id;
  }
  async sendMessage(message: string, session: string) {
    return new Promise<object>(async(resolve, reject) => {
      try {
        const accessToken = await this.getAccessToken();
        axios({
          url: `${this.config.serviceUrl}/${this.config.chatbot}/message`,
          method: 'post',
          data: {
            session,
            message,
            environment: this.config.chatbotenv,
          },
          params: {
            access_token: accessToken,
          },
        }).then((response) => {
          resolve(response.data);
        }).catch((e) => {
          if (e.response) {
            const errorObject = {
              ...e.response.data.error,
              name: 'ChatBotError',
            };
            reject(errorObject);
          }
          reject(e);
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
