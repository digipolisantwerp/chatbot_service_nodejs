import { ServiceConfig, ChatbotMessage } from './types';
import ChatMessager from './helpers/ChatMessager';

export default (config: ServiceConfig) => (chatmessage: ChatbotMessage) => {
  const chatMessager = new ChatMessager(config);
  return chatMessager.sendMessage(chatmessage.message, chatmessage.session_id, chatmessage.metadata);
};
