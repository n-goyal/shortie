const mongoose = require("mongoose");

require("dotenv").config();

console.log(process.env.NODE_ENV);

const isTestEnv = process.env.NODE_ENV == "test";

const db = isTestEnv ? global.__MONGO_URI__ : process.env.MONGO_URI;

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

const cleanConnection = async () => {
	await mongoose.connection.db.dropDatabase();
	await mongoose.connection.close();
};

module.exports = { connectDB, cleanConnection };
