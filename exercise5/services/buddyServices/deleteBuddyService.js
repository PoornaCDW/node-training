const { writeFileSync } = require('fs');

/**
 * The function deletes a buddy from a list of buddies and returns a status code, data, and message.
 * @param buddyContents - It is an array of objects that contains the current list of buddies. Each
 * object represents a buddy and contains information such as their name, employee ID, and email
 * address.
 * @param body - The `body` parameter is an object that contains the details of the buddy to be
 * deleted. It has a property `employeeId` which is used to identify the buddy to be deleted.
 * @returns An object with three properties: "status", "data", and "message". The "status" property
 * indicates the status code of the response, the "data" property contains the data that was passed as
 * an argument to the function, and the "message" property contains a message indicating whether the
 * deletion was successful or not.
 */
const deleteBuddy = (buddyContents, body) => {
    let status;
    let message;
    let index = -1;
    index = buddyContents.findIndex(buddy => buddy.employeeId === body.employeeId);
    if(index !== -1) {
        buddyContents.splice(index, 1);
        writeFileSync("./assets/cdw_ace23_buddies.json", JSON.stringify(buddyContents));
        status = 300;
        message = "Deleted successfully!";
    } else {
        status = 404;
        message = `The record with the employee ID - ${body.employeeId} was not found!`;
    }
    
    return {
        "status": status,
        "data": body,
        "message": message
    };
}

/* Exporting the function `deleteBuddy` so that it can be used in other files. */
module.exports = { deleteBuddy };