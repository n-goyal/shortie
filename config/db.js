const mongoose = require("mongoose");

require("dotenv").config();

const isTestEnv = process.env.NODE_ENV == "test";

const db = isTestEnv ? global.__MONGO_URI__ : process.env.mongoURI;

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log("Database connected...");
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
