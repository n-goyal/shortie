const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db.js");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/v1/", require("./routes/index"));
app.use("/api/v1/url/", require("./routes/url"));

module.exports = app;
