const express = require("express");
const bodyParser = require("body-parser");
const { PORT, mondoDBURL } = require("./config");
const subscriptionroute=require("./Routes/SubscriptionRoutes");
const authRoutes = require('./Routes/authRoutes');
const bulkOrderRoutes = require('./Routes/bulkOrderRoutes');
const productExcelRoutes = require("./Routes/productExcelRoutes")
const productListingRoutes = require("./Routes/productListingRoutes");
const productRoutes = require('./Routes/productRoutes')


const contractroute=require("./Routes/ContractRoutes");
const negotiationroute=require("./Routes/NegotiationRoutes");
const offerroute=require("./Routes/OfferRoutes");
const pricingmodelroute=require("./Routes/PricingModelRoutes");


// const dotenv = require("dotenv").config(); // Corrected dotenv configuration
const supplierRoutes = require('./Routes/supplierRoutes');


const mongoose = require("mongoose");


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/",subscriptionroute);
app.use('/auth', authRoutes);
app.use('/bulk-orders', bulkOrderRoutes);
app.use("/productListing", productListingRoutes);
app.use("/", productExcelRoutes)
app.use('/product', productRoutes); // Ensure this is used



app.use("/contract",contractroute);
app.use("/negotiation",negotiationroute);
app.use("/offer",offerroute);
app.use("/pricingmodel",pricingmodelroute);

app.use('/supplier', supplierRoutes); // Added supplier routes


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