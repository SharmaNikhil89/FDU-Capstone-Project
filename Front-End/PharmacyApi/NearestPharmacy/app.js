const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");

const routes = require("./routes/routes");

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

routes(app);

const server = http.createServer(app);

module.exports = server.listen(port, () => {
  console.log("Sever running in port : " + port);
});
