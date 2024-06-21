const express = require("express");
const dotenv = require("dotenv").config;
const { PORT, mongoDBURL } = require("./config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const metricsRouter = require("./routes/metricsRoutes");

const app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends: false}));

app.use("/api/metrics", metricsRouter);




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

