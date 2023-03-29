const { readFile, writeFile } = require('fs');

/**
 * It reads the file, adds the new buddy to the array, and writes the array back to the file
 * @param body - The body of the request.
 * @returns A promise - message.
 */
const addBuddy = async (body) => {
    let responseMessage;
    let promise = new Promise((resolve, reject) => {
        readFile("./assets/cdw_ace23_buddies.json", (err, data) => {
            if(err) {
                reject("Error while reading the file.");
            } else {
                let buddyContents = JSON.parse(data);
                buddyContents.push(body);
                writeFile("./assets/cdw_ace23_buddies.json", JSON.stringify(buddyContents), (err) => {
                    if(err) {
                        reject("Error while writing the file.");
                    } else {
                        resolve("Added successfully!");
                    }
                });
            }
        });
    });
    await promise.then(
        (message) => {
            responseMessage = message;
        }
    );
    return responseMessage;
}

/* Exporting the function `addBuddy` so that it can be used in other files. */
module.exports = { addBuddy };