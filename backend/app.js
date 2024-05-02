import express from 'express';
import { PORT, mondoDBURL } from './config.js';
import mongoose from 'mongoose';

const app = express();

app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Welcome to our project!')
});


mongoose
  .connect(mondoDBURL)
    .then(() => {
      console.log('app connected to database');
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
       });
     
    })
    .catch(err => {
      console.log(err);
    });