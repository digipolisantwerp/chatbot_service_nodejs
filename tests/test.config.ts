export const environment = {
  NODE_ENV: 'test',
  SERVICEURL: 'https://localhost',
  CHATBOT: '123456',
  CHATBOT_ENV: 'production',
  ACCESSTOKEN: 'fake!',
  TOKEN: 'fake!',
};

Object.keys(environment).forEach((key) => {
  process.env[key] = environment[key];
});
