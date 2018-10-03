export const environment = {
  NODE_ENV: 'test',
  SERVICEURL: 'https://localhost',
  CHATBOT: '123456',
  CHATBOT_ENV: 'production',
  ACCESSTOKEN: 'fake!',
  TOKEN: 'fake!',
  APIKEY: 'this-is-the-key',
};

Object.keys(environment).forEach((key) => {
  process.env[key] = environment[key];
});
