const { readFile, writeFile } = require('fs');

/**
 * It reads the file, deletes the buddy with the given ID, and writes the file
 * @param body - The body of the request.
 * @returns A promise is being returned with a message.
 */
const deleteBuddy = async (body) => {
    let deleteMessage;
    let promise = new Promise((resolve, reject) => {
        readFile("./assets/cdw_ace23_buddies.json", (err, data) => {
            if(err) {
                reject("Error while reading the file.");
            } else {
                let index = -1;
                let buddyContents = JSON.parse(data);
                for(buddy in buddyContents) {
                    if(body.employeeId == buddyContents[buddy].employeeId) {
                        index = buddy;
                    }
                }
                if(index !== -1) {
                    buddyContents.splice(index, 1);
                    writeFile("./assets/cdw_ace23_buddies.json", JSON.stringify(buddyContents), (err) => {
                        if(err) {
                            reject("Error while writing the file.");
                        } else {
                            resolve("Deleted successfully!");
                        }
                    });
                } else {
                    resolve("Buddy details with the given ID wasn't found!");
                }
            }
        });
    });
    await promise.then(
        (message) => {
            deleteMessage = message;
        }
    );
    return deleteMessage;
}

/* Exporting the function `deleteBuddy` so that it can be used in other files. */
module.exports = { deleteBuddy };