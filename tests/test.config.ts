export const environment = {
  ACCESSTOKEN: 'fake!',
  APIKEY: 'this-is-the-key',
  CHATBOT: '123456',
  CHATBOT_ENV: 'production',
  NODE_ENV: 'test',
  SERVICEURL: 'https://localhost',
  TOKEN: 'fake!',
};

Object.keys(environment).forEach((key) => {
  process.env[key] = environment[key];
});
