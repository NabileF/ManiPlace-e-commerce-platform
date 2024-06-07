const express = require("express");
const bodyParser = require("body-parser");
const { PORT, mondoDBURL } = require("./config");
const subscriptionroute=require("./routes/SubscriptionRoutes")
const negotiationroute=require("./routes/NegotiationRoutes")
app.use("/negotiation", negotiationroute)

const offerroute = require("./routes/OfferRoutes")
app.use("/offer", offerroute )

const mongoose = require("mongoose");


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/",subscriptionroute);

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