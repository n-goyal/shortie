const router = require("express").Router();
const validUrl = require("valid-url");
const shortid = require("shortid");

const url = require("../models/model");

require("dotenv").config();

router.post("/shorten", async (req, res) => {
	const { longUrl } = req.body;
	const baseUrl = "http://localhost:2390/api/v1/";

	if (!validUrl.isUri(baseUrl)) {
		return res.status(401).json({
			message: "Internal Error! Please come back later.",
		});
	}

	const urlCode = shortid.generate();

	if (validUrl.isUri(longUrl)) {
		try {
			let urls = await url.findOne({
				longUrl: longUrl,
			});
			if (urls) {
				return res.status(200).json({
					message: "Success",
					urls,
				});
			} else {
				const shortUrl = `${baseUrl}/${urlCode}`;
				urls = new url({
					urlCode,
					longUrl,
					shortUrl,
				});
				await urls.save();
				return res.status(201).json({
					message: "Created",
					urls,
				});
			}
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				message: `Internal Server Failure: ${error.message}`,
			});
		}
	} else {
		return res.status(400).json({
			message: "invalid URL",
		});
	}
});

module.exports = router;
