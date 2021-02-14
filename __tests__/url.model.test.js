const mongoose = require("mongoose");
const urlModel = require("../models/model");
const { cleanConnection, connectDB } = require("../config/db");

const urlData = {
	longUrl: "https://www.google.com",
	urlCode: "test_code",
	shortUrl: "https://www.short.ie/test_code",
};

describe("URL Model", () => {
	beforeEach(async () => {
		connectDB();
	});

	afterEach(async () => {
		cleanConnection();
	});

	// insert into db
	it("Create & Save - Success", async () => {
		console.log(urlModel);
		const validURL = new urlModel(urlData);
		const savedURL = await validURL.save();
		expect(savedURL._id).toBeDefined();
		expect(savedURL.urlCode).toBe(urlData.urlCode);
		expect(savedURL.date).toBeDefined();
		expect(savedURL.longUrl).toBe(urlData.longUrl);
		expect(savedURL.shortUrl).toBe(urlData.shortUrl);
	});

	// insert invalid field
	it("Create & Save - Invalid Fields", async () => {
		const invalidURL = new urlModel({
			data: "invalid field",
			longUrl: "https://music.amazon.in",
		});
		const savedURL = await invalidURL.save();
		expect(savedURL._id).toBeDefined();
		expect(savedURL.data).toBeUndefined();
	});
});
