const express = require('express');
const bodyParser = require('body-parser');
const { PORT, mongoDBURL } = require('./config');
const supplierIdentificationRoute = require('./routes/supplierIdentification.routes');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/supplier', supplierIdentificationRoute);

mongoose
  .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
