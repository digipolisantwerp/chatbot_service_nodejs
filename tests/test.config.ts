export const environment = {
  NODE_ENV: 'test',
  SERVICEURL: 'https://apistore.be',
  CHATBOT: '123456',
  CHATBOT_ENV: 'production',
  CHATBOT_USER: 'cahtbotuser',
  CHATBOT_PASS: 'chatbotpass',
};

Object.keys(environment).forEach((key) => {
  process.env[key] = environment[key];
});

