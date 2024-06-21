const express = require("express");
const bodyParser = require("body-parser");
const { PORT, mondoDBURL } = require("./config");
const subscriptionroute=require("./routes/SubscriptionRoutes");
const contractroute=require("./routes/ContractRoutes");
const negotiationroute=require("./routes/NegotiationRoutes");
const offerroute=require("./routes/OfferRoutes");
const pricingmodelroute=require("./routes/PricingModelRoutes");

const mongoose = require("mongoose");


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/",subscriptionroute);
app.use("/contract",contractroute);
app.use("/negotiation",negotiationroute);
app.use("/offer",offerroute);
app.use("/pricingmodel",pricingmodelroute);

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