const express = require("express");
const { PORT, mondoDBURL } = require("./config");
const mongoose = require("mongoose");
const SubscriptionPlan = require("./models/SubscriptionPlan");
const { supplierRoutes } = require("./routes/supplierRoutes");
//const { bodyParser } = require("body-parser");
// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
//app.use(bodyParser.json());

app.get("/", (req, res) => {
  //return res.status(234).send("Welcome to our project!");
  const newSubscriptionPlan = new SubscriptionPlan({
    planId: "001",
    name: "Premium plan",
    price: 1500,
    features: ["feature 1", "feature 2"],
    accessLevel: "full Access",
    trialDays: 4,
  });

  newSubscriptionPlan
    .save()
    .then(() => res.status(200).json(newSubscriptionPlan))
    .catch((err) => console.log(err));
});

//app.use("/api/suppliers", supplierRoutes);

mongoose
  .connect(mondoDBURL)
  .then(() => {
    console.log("app connected to database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
