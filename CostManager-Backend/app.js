const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const userAuth = require("./routers/userAuth");
require("dotenv").config();


// Create an instance of express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/auth", userAuth.router);

// Import the costDoc and connectToDB functions from db.js
const { connectToDB, costDoc,userDoc } = require("./db/db");

// Import the routers for the add cost, report, and about pages
const addCostRouter = require("./routers/addCost");
const reportRouter = require("./routers/report");
const deleteCostRouter = require("./routers/deleteCost");
const aboutRouter = require("./routers/about");

// Connect to the MongoDB database as soon as the application starts
(async () => {
await connectToDB();
app.db = { costDoc,userDoc };
})();

// Use the routers for the add cost, report, and about pages
app.use("/addcost", addCostRouter);
app.use("/report", reportRouter);
app.use("/about", aboutRouter);
app.use("/deletecost", deleteCostRouter);
app.use("/auth", userAuth.router);


// Export the express app
module.exports = app;