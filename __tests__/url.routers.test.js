const mongoose = require("mongoose");
const supertest = require("supertest");
const urlModel = require("../models/model");
const app = require("../app");

const request = supertest(app);

describe("URL routes", () => {
	console.log("connecting to the database...");

	it("POST /shorten - save", async () => {
		const urlObj = {
			longUrl: "https://www.google.com",
		};
		const response = await request.post("/api/v1/url/shorten").send(urlObj);
		console.log(response.body);
		console.log(response.status);
		expect(response.status).toBe(201);
	});

	it("GET /", async () => {
		// make an entry to database
		const urlObj = {
			longUrl: "https://music.amazon.com",
		};
		const postRes = await request.post("/api/v1/url/shorten").send(urlObj);
		console.log(postRes.status);
		const urlCode = postRes.body.urls.urlCode;
		const url = await urlModel.findOne({ urlCode });
		console.log(url);
		expect(url.longUrl).toBe(urlObj.longUrl);
		expect(url._id).toBeDefined();
		expect(url.shortUrl).toBeDefined();
	});

	afterAll(async () => {
		await mongoose.connection.db.dropDatabase(() => {
			mongoose.connection.close();
		});
	});
});
