const mongoose = require("mongoose");

require("dotenv").config();

const db = process.env.mongoURI;

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log("Database connected...");
	} catch (error) {
		console.log(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
