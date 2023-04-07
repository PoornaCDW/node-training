/* Importing the `readFileSync` function from the built-in Node.js `fs` module and assigning it to a
constant variable named `readFileSync`. */
const { readFileSync } = require("fs");

const readFileHelper = (path) => {
    try {
        return JSON.parse(readFileSync(path, "utf-8"));
    } catch (error) {
        return ("Error while reading the file: " + path + ", with the error:"+error);
    }
}

module.exports = { readFileHelper };