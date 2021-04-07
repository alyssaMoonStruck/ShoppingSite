const express = require("express");
const cors = require("cors");
var bodyParser = require('body-parser')
const morgan = require("morgan");

// Create Server
const app = express();

// Server + DB Config
require("./config/mongoose.js")(app);
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use('/files', express.static("files"));

// Routes
app.get("/", (req, res) => {
	res.json({
		message: "Hewo000w",
	});
});
require('../src/routerHandler')(app);

// Connect server to port
const port = 4000;
app.listen(port, () => {
	console.log(`Application is running on ${port}`);
});
