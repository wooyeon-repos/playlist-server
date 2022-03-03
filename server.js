const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("./app/db");

const connection = mysql.init();
mysql.connect(connection);

exports.connection = connection;
var corsOptions = {
  origin: "http://localhost:3001",
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ data: "🚀" });
  // mysql.createDatabase(connection);
});
require("./app/routes/user.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
