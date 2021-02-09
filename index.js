const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 2390;

app.use(express.json());

// app.use('/', require('./routes/index'));
// app.use('/api/url', require('./routes/url'));

app.listen(PORT, () => {
	console.log(`app is listening at ${PORT}`);
});
