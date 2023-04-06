/* This is importing the randomGeneratedColorPalette function from the randomPaletteGeneration.js file
and importing the http module. */
const { randomGeneratedColorPalette } = require("./randomPaletteGeneration");
const { createServer } = require("http");
require("dotenv").config();

/* Creating a server that listens on port 4000 and returns a JSON object of a random color palette. */
createServer((request, response, error) => {
    if(error) {
        console.log("Error");
    } else {
        /* Writing the JSON object to the response. */
        response.write(JSON.stringify(randomGeneratedColorPalette(), null, 4));
        response.end();
    }
}).listen(process.env.PORT);