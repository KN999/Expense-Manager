const express = require("express");
var router = express.Router();
var bodyParser = require('body-parser')
const app = express();

const port = process.env.PORT || "8000";

var userRoute = require("./Routes/serviceLayer/users.js");
var transRoute = require("./Routes/ServiceLayer/transaction.js");

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use("/users", userRoute);
app.use("/trans", transRoute);

app.get("/", (req, res) => {
    res.status(200).send("Ping Pong");
});

app.listen(port, () => {
    console.log(`Listening the request at http://localhost:${port}`);
});