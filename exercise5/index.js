const express = require("express");
const fileSystem = require("fs");
const expressApp = express();
const cors = require("cors");
require("dotenv").config();

/* This is a middleware that is used to parse the request body. */
expressApp.use(express.urlencoded( {extended: false} ));
expressApp.use(express.json());

/* `expressApp.use(cors({ origin: ["http://localhost:4005", "https://www.google.com"] }));` is enabling
Cross-Origin Resource Sharing (CORS) for the server. */
expressApp.use(cors({
    origin: ["https://www.google.com"]
}));

const buddyRoute = require("./routes/buddy.routes");
expressApp.use("/buddy", buddyRoute);

/* This is a route that is used to handle the base route. */
expressApp.use("/", (request, response) => {
    response.send("Base route!");
});

/* This is the code that starts the server. */
expressApp.listen(process.env.PORT, () => {
    console.log("Server started at port - "+process.env.PORT);
    if(!fileSystem.existsSync("./assets/cdw_ace23_buddies.json")) {
        fileSystem.writeFileSync("./assets/cdw_ace23_buddies.json", JSON.stringify([]));
    }
});