/**
 * The function checks if a given employee ID exists in a list and returns a corresponding message and
 * status code.
 * @param buddyContents - an array of objects containing information about buddies
 * @param body - The `body` parameter is an object that contains information about an employee,
 * including their `employeeId`.
 * @returns an object with three properties: "status", "data", and "message". The "status" property is
 * either 300 or 404 depending on whether the record with the given employee ID was found or not. The
 * "data" property is the buddyContents object at the index where the employee ID was found, or
 * undefined if it was not found. The "message" property
 */
const listBuddy = (buddyContents, body) => {
    let status;
    let message;
    let index = -1;
    index = buddyContents.findIndex(buddy => buddy.employeeId === body.employeeId);
    if(index !== -1) {
        status = 300;
        message = `The record with the employee ID - ${body.employeeId} was found!`;
    } else {
        status = 404;
        message = `The record with the employee ID - ${body.employeeId} was not found!`;
    }
    return {
        "status": status,
        "data": buddyContents[index],
        "message": message
    };
}

/**
 * The function returns a JSON object containing a status code, data, and a message for a list of
 * buddies.
 * @param buddyContents - an array of objects containing information about buddies.
 * @returns A JavaScript object with three properties: "status", "data", and "message". The "status"
 * property has a value of 300, the "data" property has a value of the "buddyContents" parameter passed
 * into the function, and the "message" property has a value of "The body records were found!".
 */
const listAllBuddies = (buddyContents) => {
    let status = 300;
    let message = `The body records were found!`;
    return {
        "status": status,
        "data": buddyContents,
        "message": message
    };
}

/* Exporting the functions `listBuddy` and `listAllBuddies` so that they can be used in other files. */
module.exports = { 
    listBuddy,
    listAllBuddies
};