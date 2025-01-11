const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const statsRoute = require("./routes/stats");
const deviationRoute = require("./routes/deviation");
const fetchCryptoData = require("./jobs/fetchCryptoData");
const cron = require("node-cron");

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

cron.schedule("0 */2 * * *", fetchCryptoData);

app.use(statsRoute);
app.use(deviationRoute);

module.exports = app;
