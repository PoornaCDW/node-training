const express = require("express");
const fileSystem = require("fs");
const expressApp = express();
require("dotenv").config();

expressApp.use(express.urlencoded( {extended: false} ));
expressApp.use(express.json());

expressApp.use("/", (request, response) => {
    response.send("Base route!");
});

expressApp.listen(process.env.PORT, () => {
    console.log("Server started at port - "+process.env.PORT);
});