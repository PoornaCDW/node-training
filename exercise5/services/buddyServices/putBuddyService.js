const { writeFileSync } = require('fs');

/**
 * The function updates the details of a buddy in a JSON file and returns a status code, data, and a
 * message.
 * @param buddyContents - an array of objects containing information about buddies
 * @param body - The `body` parameter is an object that contains the updated details of a buddy,
 * including their `employeeId`, `nickName`, and `hobbies`.
 * @returns an object with three properties: "status", "data", and "message". The "status" property
 * contains a status code indicating the success or failure of the update operation. The "data"
 * property contains the updated data that was passed as an argument to the function. The "message"
 * property contains a message indicating the outcome of the update operation.
 */
const updateBuddy = (buddyContents, body) => {
    let status;
    let message;let flag = true;
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
    } else {
        writeFileSync("./assets/cdw_ace23_buddies.json", JSON.stringify(buddyContents));
        status = 300;
        message = "Details updated successfully!";
    }

    return {
        "status": status,
        "data": body,
        "message": message
    };
}

/* Exporting the function `updateBuddy` so that it can be used in other files. */
module.exports = { updateBuddy };