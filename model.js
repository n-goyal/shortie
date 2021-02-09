const mongoose = require("mongoose");
// const { nanoid } = require("nanoid");

const urlSchema = new mongoose.Schema({
	urlCode: String,
	longUrl: String,
	shortUrl: String,
	date: {
		type: string,
		default: Date.now,
	},
});

module.exports = mongoose.model("Url", urlSchema);
