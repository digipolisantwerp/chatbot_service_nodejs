export interface ServiceConfig {
  serviceUrl: string;
  chatbot: string;
  chatbotenv: string;
  username: string;
  password: string;
}
/**
 * interface ChatbotMessageButton
 * ------------------------------
 * replyText: message text that is sent to the chatbot engine
 * text: text that is shown to the user as possible reply
 */
export interface ChatbotAccess {
  id: string;
  ttl: string;
  created: string;
  userId: string;
}
export interface ChatbotMessageButton {
  replyText: string;
  text: string;
}

/**
 * interface ChatbotMessage
 * ------------------------
 * message: message to send to or receive from the chatbot engine
 * type: message type, can be either text, url, image, radio or error
 * session_id: id that identifies the chat to easily retrieve the chat history if necessary
 * send: whether the message is from the chatbot (false) or the user (true);
 * hide: whether the message should be hidden in the conversation, e.g. when a button was clicked
 */
export interface ChatbotMessage {
  message: string;
  send?: boolean;
  session_id: string;
  type?: string;
}
