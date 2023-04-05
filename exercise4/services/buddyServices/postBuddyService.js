const { readFile, writeFile } = require('fs');

/**
 * It reads the file, adds the new buddy to the array, and writes the array back to the file
 * @param body - The body of the request.
 * @returns A promise - message.
 */
const addBuddy = async (body) => {
    let status;
    let message;
    let promise = new Promise((resolve, reject) => {
        readFile("./assets/cdw_ace23_buddies.json", (err, data) => {
            if(err) {
                status = 404;
                message = "Error while reading the file.";
                reject(err);
            } else {
                let buddyContents = JSON.parse(data);
                buddyContents.push(body);
                writeFile("./assets/cdw_ace23_buddies.json", JSON.stringify(buddyContents), (err) => {
                    if(err) {
                        status = 404;
                        message = "Error while writing the file.";
                        reject("[]");
                    } else {
                        status = 300;
                        resolve("Details added successfully!");
                    }
                });
            }
        });
    });
    await promise.then(
        (mes) => {
            message = mes;
        }
    );

    return {
        "status": status,
        "data": body,
        "message": message
    };
}

/* Exporting the function `addBuddy` so that it can be used in other files. */
module.exports = { addBuddy };