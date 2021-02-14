const router = require("express").Router();
const validUrl = require("valid-url");
const shortid = require("shortid");

const url = require("../models/model");

require("dotenv").config();

router.post("/shorten", async (req, res) => {
	const { longUrl, slug } = req.body;

	console.log(`slug is given by the user: ${slug}`);
	const urlCode = slug ? slug : shortid.generate();

	const baseUrl = `${process.env.BASE_URL}/api/v1/`;

	if (validUrl.isUri(longUrl)) {
		try {
			let result = await url.findOne({
				longUrl: longUrl,
			});
			if (result) {
				return res.status(208).json({
					message: "Requested URL already exists.",
					result,
				});
			} else {
				const shortUrl = `${baseUrl}${urlCode}`;
				result = new url({
					urlCode,
					longUrl,
					shortUrl,
				});
				await result.save();
				return res.status(201).json({
					message: "Created",
					result,
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
			message: "Input URL is invalid, please check and try again!",
		});
	}
});

module.exports = router;
