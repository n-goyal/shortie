const app = require("./app");

const PORT = process.env.NODE_ENV === "test" ? 3001 : process.env.PORT || 2390;

app.listen(PORT, () => {
	console.log(`app is listening at ${PORT}`);
});
