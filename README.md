[![Build Status](https://travis-ci.com/digipolisantwerp/chatbot_service_nodejs.svg?branch=master)](https://travis-ci.com/digipolisantwerp/chatbot_service_nodejs)
[![Coverage Status](https://coveralls.io/repos/github/digipolisantwerp/chatbot_service_nodejs/badge.svg?branch=master)](https://coveralls.io/github/digipolisantwerp/chatbot_service_nodejs?branch=master)
# Chatbot Smart Widget BFF (Node)

This is a Node.js backend service library to create a BFF service for the Chatbot Smart Widget. The widget provides a chat interface.

There is a **demo service**, see below for instructions on running it.

## How to use

### Installing

Copy the .npmrc file from this repo to your application's folder.

Then install (you will need to be on the digipolis network):

```sh
> npm install --save @acpaas-ui-widgets/nodejs-chatbot
```

### Using

#### Express example:

```js
const express = require('express');
const chatbotService = require('@acpaas-ui-widgets/nodejs-chatbot-service');

const app = express();

const controller = chatbotService.chatbot.createController({
  accessToken: <ACCESS_TOKEN> (you can find this in the chatbot interface under 'Instellingen'),
  chatbot: <CHATBOT> the Id of the chatbot you want to address,
  chatbotenv: <CHATBOT_ENV> test | production,
  serviceUrl: <SERVICEURL> endpoint (api-store),
  apikey: <APIKEY> the apikey from the api-store
});

app.post('/api/chatbot', controller);
app.listen(3000);
```

#### Typescript example:

```js
import * as express from 'express';
import chatbotService from '@acpaas-ui-widgets/nodejs-chatbot';

const app = express();

const controller = chatbotService.createController({
  accessToken: <ACCESS_TOKEN> (you can find this in the chatbot interface under 'Instellingen'),
  chatbot: <CHATBOT> the Id of the chatbot you want to address,
  chatbotenv: <CHATBOT_ENV> test | production,
  serviceUrl: <SERVICEURL> endpoint (api-store),
  apikey: <APIKEY> the apikey from the api-store
});

app.post('/api/chatbot', controller);
app.listen(3000);
```

## Run the demo app

Create a .env file containing:

```sh
ACCESS_TOKEN=
CHATBOT=
CHATBOT_ENV=
PORT=(optional, defaults to 3000)
SERVICEURL=
TOKEN=
APIKEY=
```

Obtain the APIKEY by taking out a contract on the `chatbot-api` service on [api-store.antwerpen.be](https://api-store.antwerpen.be). The ACCESS_TOKEN value can be obtained at the bottom of the settings screen ("API token") on [chatbots.antwerpen.be](https://chatbots.antwerpen.be).

(Add `-o` or `-a` extensions where needed to the host names to access the development or acceptance environments.)

Run the service:

```sh
> npm install
> npm start
```

## Service Specification

```sh
POST: /chats/{botId}/message?access_token={access_token}
{
  "message": "Hello World",
  "session_id": "<your session id>",
  "type": "message",
  "send": "true",
  "metadata": {
    "firstname": "Example",
    "lastname:": "name",
    "..." : "..."
  }
}
```

- **message:** Your message to the bot,
- **session_id:** The chatsession
- **type:** message
- **send:** true
- **metadata:**: Metadata to be passed along, this has to be an object.

An [example swagger description](swagger.yml) is included.

## Contributing

We welcome your bug reports and pull requests.

Please see our [contribution guide](CONTRIBUTING.md).

## License

This project is published under the [MIT license](LICENSE.md).
