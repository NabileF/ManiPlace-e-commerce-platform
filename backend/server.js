

// const express = require("express");
// const app = express();
// const port = 5400;
// const subscriptionRouter = require("./Routes/subscriptionRoutes");
// require("dotenv").config();

// require("./DB/ConnectDB");

// app.use(express.json());
// app.use("/subscriptions", subscriptionRouter);

// app.listen(port, () => {
//   console.log(`server is runing at http://localhost:${port}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/userRoutes');
const supplierRoutes = require('./Routes/supplierRoute');
const subscriptionRoutes = require('./Routes/subscriptionRoutes');
require('dotenv').config(); // Assure-toi d'importer dotenv si tu utilises des variables d'environnement

const app = express();

// Middleware
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Quitte le processus Node.js en cas d'échec de la connexion à MongoDB
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
