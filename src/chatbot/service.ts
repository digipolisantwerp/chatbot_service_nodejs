import { ServiceConfig, ChatbotMessage } from './types';
import ChatMessager from './helpers/Chatmessager';
export =  (config: ServiceConfig) => async (chatmessage: ChatbotMessage) => {
  const chatMessager = new ChatMessager(config);
  return chatMessager.sendMessage(chatmessage.message, chatmessage.session_id);
};
