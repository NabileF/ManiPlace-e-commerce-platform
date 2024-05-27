const express = require("express");
const dotenv = require("dotenv").config;
const { PORT, mongoDBURL } = require("./config");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoute");
const bodyParser = require("body-parser");
const { NOTFOUND } = require("dns");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const productRouter = require('./routes/productRoute');


const app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends: false}));
app.use("/api/user", authRouter);
app.use('/api/products', productRouter);


app.use(notFound);
app.use(errorHandler);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connected to database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

