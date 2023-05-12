const openai = require('openai');
const line = require('@line/bot-sdk');

openai.apiKey = "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";

const config = {
  channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN',
  channelSecret: 'YOUR_CHANNEL_SECRET'
};

const client = new line.Client(config);

const express = require('express');
const app = express();
const port = 3000;

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});