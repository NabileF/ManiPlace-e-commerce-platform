
// const express = require("express");
// const app = express();
// const port = 5400;
// const subscriptionRouter = require("./Routes/subscriptionRoutes")
// require("dotenv").config();

// require("./DB/ConnectDB");

// app.use(express.json());
// app.use("/subscription", subscriptionRouter);

// app.listen(port, () => {
//   console.log(`server is runing at http://localhost:${port}`);
// });
 

// server.js

const express = require("express");
const app = express();
const port = 5400;
const subscriptionRouter = require("./Routes/subscriptionRoutes");
require("dotenv").config();

require("./DB/ConnectDB");

app.use(express.json());
app.use("/subscriptions", subscriptionRouter);

app.listen(port, () => {
  console.log(`server is runing at http://localhost:${port}`);
});

 