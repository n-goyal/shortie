const express = require("express");
const router = express.Router();

const url = require("../models/model");

router.get("/:code", async (req, res) => {
	try {
		const urlx = await url.findOne({ urlCode: req.params.code });

		if (urlx) {
			return res.status(200).json(urlx);
		} else {
			return res.status(404).json({ message: "No URL Found!" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
});

module.exports = router;
