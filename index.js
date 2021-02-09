const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 2390;

app.use(express.json());

connectDB();
// app.use('/', require('./routes/index'));
// app.use('/api/url', require('./routes/url'));

app.listen(PORT, () => {
	console.log(`app is listening at ${PORT}`);
});
