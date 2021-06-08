require('dotenv').config();
import express from 'express';

import { searchMessage } from './utils/database';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({message: 'The Chatbot server is running!'});
});

app.post('/chatbot', async (req, res) => {
  const searchResults = await searchMessage(req.body.message);
  res.json((searchResults));
});



app.listen(port, () => {
  try{
    return console.log(`server is listening on ${port}`);
  }
  catch (err) {
    return console.error(err);
  }
});