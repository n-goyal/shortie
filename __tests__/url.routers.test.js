const mongoose = require("mongoose");
const supertest = require("supertest");
const urlModel = require("../models/model");
const app = require("../app");
const { cleanConnection, connectDB } = require("../config/db");

const request = supertest(app);

describe("URL routes", () => {
	beforeAll(async () => {
		connectDB();
	});

	afterAll(async () => {
		cleanConnection();
	});

	it("POST /api/v1/shorten - Auto Slug Generation", async () => {
		const urlObj = {
			longUrl: "https://www.google.com",
		};
		const response = await request.post("/api/v1/url/shorten").send(urlObj);
		expect(response.status).toBe(201);
	});

	it("POST /api/v1/shorten - Slug Input", async () => {
		const urlObj = {
			longUrl: "https://www.hotmail.com",
			slug: "shortie",
		};
		const response = await request.post("/api/v1/url/shorten").send(urlObj);
		expect(response.status).toBe(201);
	});

	it("POST /api/v1/shorten - Invalid Input URL", async () => {
		const urlObj = {
			longUrl: "hotmail.com",
			slug: "shortie",
		};
		const response = await request.post("/api/v1/url/shorten").send(urlObj);
		expect(response.status).toBe(400);
		expect(response.body.message).toBe(
			"Input URL is invalid, please check and try again!"
		);
	});

	it("POST /api/v1/shorten - Input URL already exists", async () => {
		const urlObj = {
			longUrl: "https://www.google.com",
		};
		await request.post("/api/v1/url/shorten").send(urlObj);
		const urlObj1 = {
			longUrl: "https://www.google.com",
		};
		const response = await request
			.post("/api/v1/url/shorten")
			.send(urlObj1);
		expect(response.status).toBe(208);
		expect(response.body.message).toBe("Requested URL already exists.");
		expect(response.body.result).toBeDefined();
	});

	it("GET /:slug - Valid Request", async () => {
		// make an entry to database
		const urlObj = {
			longUrl: "https://music.amazon.com",
		};
		const postRes = await request.post("/api/v1/url/shorten").send(urlObj);
		const urlCode = postRes.body.result.urlCode;
		const getRes = await request.get(`/api/v1/${urlCode}`);
		const url = await urlModel.findOne({ urlCode });
		expect(getRes.body.longUrl).toBe(url.longUrl);
		expect(getRes.body.shortUrl).toBe(url.shortUrl);
	});

	it("GET /:slug - Invalid Slug-No URL Found", async () => {
		const getRes = await request.get(`/api/v1/invalid_slug`);
		expect(getRes.status).toBe(404);
		expect(getRes.body.message).toBe("No URL Found!");
	});
});
