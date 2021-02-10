const mongoose = require("mongoose");
const urlModel = require("../models/model");

const urlData = {
	longUrl: "https://www.google.com",
	urlCode: "test_code",
	shortUrl: "https://www.short.ie/test_code",
};

describe("URL Model Test", () => {
	beforeAll(async () => {
		try {
			await mongoose.connect(global.__MONGO_URI__, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});

			console.log("Database connected...");
		} catch (err) {
			console.log(err.message);
			process.exit(1);
		}
	});

	// insert into db
	it("Create and Save URL Successfully", async () => {
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
	it("Create & Save URL with invalid fields to be undefined", async () => {
		const invalidURL = new urlModel({
			data: "invalid field",
			longUrl: "https://music.amazon.in",
		});
		const savedURL = await invalidURL.save();
		expect(savedURL._id).toBeDefined();
		expect(savedURL.data).toBeUndefined();
	});

	afterAll(async () => {
		mongoose.connection.close();
	});
});
