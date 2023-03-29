import { createServer } from "http";
import { randomColorFileGeneration } from "./randomGeneration.js";

createServer((request, response, error) => {
    if(error) {
        console.log("Error");
    } else {
        response.write(JSON.stringify(randomColorFileGeneration(), null, 4));
        response.end();
    }
}).listen(4000);