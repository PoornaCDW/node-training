/* Importing the functions from the files. */
const { createServer } = require("http");
const { randomColorFileGeneration } = require("./randomGeneration");
// import { createServer } from "http";
// import { randomColorFileGeneration } from "./randomGeneration.js";

/* Creating a server and listening to the port 4000. */
createServer((request, response, error) => {
    if(error) {
        console.log("Error while creating server.");
    } else {
        /* Writing the JSON object to the response. */
        response.write(JSON.stringify(randomColorFileGeneration(), null, 4));
        response.end();
    }
}).listen(4000);