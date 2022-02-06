
const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");
const todoRoutes = require("./route/todoRoute");
const auth = require("./authentication/todoAuth");





var app = express();
app.use(bodyParser.json());

// include the todoRoutes
app.use("/api", auth ,todoRoutes);

const port = 8000;




app.listen(port ,() => {
    console.log(`Listening to http://localhost:${port}`);
});


