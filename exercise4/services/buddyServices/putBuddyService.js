const { readFile, writeFile } = require('fs');

/**
 * It reads the file, updates the buddy with the given employee ID, and writes the file
 * @param body - The body of the request.
 * @returns A promise is being returned with a message.
 */
const updateBuddy = async (body) => {
    let updatedData;
    let status;
    let message;
    let promise = new Promise((resolve, reject) => {
        readFile("./assets/cdw_ace23_buddies.json", (err, data) => {
            if(err) {
                status = 404;
                message = "Error while reading the file.";
                reject(err);
            } else {
                let flag = true;
                let buddyContents = JSON.parse(data);
                for(buddy of buddyContents) {
                    if(body.employeeId == buddy.employeeId) {
                        buddy.nickName = body.nickName;
                        buddy.hobbies = body.hobbies;
                        flag = false;
                    }
                }
                if(flag) {
                    status = 404;
                    message = `The record with the employee ID - ${body.employeeId} was not found!`;
                    resolve(body);
                } else {
                    writeFile("./assets/cdw_ace23_buddies.json", JSON.stringify(buddyContents), (err) => {
                        if(err) {
                            status = 404;
                            message = "Error while writing the file.";
                            reject("[]");
                        } else {
                            status = 300;
                            message = "Details updated successfully!";
                            resolve(buddyContents);
                        }
                    });
                }
            }
        });
    });
    await promise.then(
        (data) => {
            updatedData = data;
        }
    );

    return {
        "status": status,
        "data": updatedData,
        "message": message
    };
}

/* Exporting the function `updateBuddy` so that it can be used in other files. */
module.exports = { updateBuddy };