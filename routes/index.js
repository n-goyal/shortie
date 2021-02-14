const express = require("express");
const router = express.Router();

const url = require("../models/model");

router.get("/:code", async (req, res) => {
	try {
		const result = await url.findOne({ urlCode: req.params.code });

		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(404).json({ message: "No URL Found!" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Internal Server Error😥, We'll be back up soon!",
		});
	}
});

module.exports = router;
