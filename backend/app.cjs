import('./config.js').then(({ PORT, mondoDBURL }) => {

  const express = require('express');
  const mongoose = require('mongoose');
  const app = express();

  app.use(express.json());

  // Route for subscription plans
  const subscriptionRoute = require("./Routes/subscriptionRoute.cjs");
  app.use("/subscription/plan", subscriptionRoute);

  app.get('/', (req, res) => {
    res.status(200).send('Welcome to our project!');
  });

  mongoose.connect(mondoDBURL)
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
}).catch((err) => {
  console.error('Error importing config.js:', err);
});
