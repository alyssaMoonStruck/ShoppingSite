const express = require("express");
const cors = require("cors");
// var bodyParser = require("body-parser");
const morgan = require("morgan");

// Create Server
const app = express();

var allowlist = ["http://localhost:3000"];
var corsOptionsDelegate = function (req, callback) {
	var corsOptions;
	if (allowlist.indexOf(req.header("Origin")) !== -1) {
		corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = { origin: false }; // disable CORS for this request
	}
	callback(null, corsOptions); // callback expects two parameters: error and options
};

// Server + DB Config
require("./config/mongoose.js")(app);
app.use(morgan("dev"));
app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use("/files", express.static("files"));
app.use('/api/users', require('../routes/api/users'));
app.use('/api/auth', require('../routes/api/auth'));

// Routes
app.get("/", (req, res) => {
	res.json({
		message: "Hewow",
	});
});
require("../src/routerHandler")(app);

// Connect server to port
const port = 4000;
app.listen(port, () => {
	console.log(`Server is running on ${port}`);
});
