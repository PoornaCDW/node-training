/* This line of code is importing the `writeFileSync` function from the built-in Node.js `fs` (file
system) module. */
const { writeFileSync } = require("fs");

const writeFileHelper = (path, data) => {
    try {
        writeFileSync(path, JSON.stringify(data), "utf8");
        return "File written successfully";
    } catch (error) {
        return ("Error while writing the file: " + path + ", with the error:"+error);
    }
}

module.exports = { writeFileHelper };