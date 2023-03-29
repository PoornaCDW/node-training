const { readFile, writeFile } = require('fs');

/**
 * It reads the file, updates the buddy with the given employee ID, and writes the file
 * @param body - The body of the request.
 * @returns A promise is being returned with a message.
 */
const updateBuddy = async (body) => {
    let updateMessage;
    let promise = new Promise((resolve, reject) => {
        readFile("./assets/cdw_ace23_buddies.json", (err, data) => {
            if(err) {
                reject("Error while reading the file.");
            } else {
                let flag = true;
                let buddyContents = JSON.parse(data);
                for(buddy of buddyContents) {
                    if(body.employeeId == buddy.employeeId) {
                        buddy.realName = body.realName;
                        buddy.nickName = body.nickName;
                        buddy.dob = body.dob;
                        buddy.hobbies = body.hobbies;
                        flag = false;
                    }
                }
                if(flag) {
                    resolve("The employee with the given ID was not found!");
                } else {
                    writeFile("./assets/cdw_ace23_buddies.json", JSON.stringify(buddyContents), (err) => {
                        if(err) {
                            reject("Error while writing the file.");
                        } else {
                            resolve("Updated successfully!");
                        }
                    });
                }
            }
        });
    });
    await promise.then(
        (message) => {
            updateMessage = message;
        }
    );
    return updateMessage;
}

/* Exporting the function `updateBuddy` so that it can be used in other files. */
module.exports = { updateBuddy };