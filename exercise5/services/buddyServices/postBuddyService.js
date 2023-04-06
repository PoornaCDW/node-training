const { writeFileSync } = require('fs');

/**
 * The function adds a new buddy to an array of buddies and writes the updated array to a JSON file.
 * @param buddyContents - An array containing the current list of buddies.
 * @param body - The `body` parameter is an object containing the details of a new buddy that needs to
 * be added to the `buddyContents` array.
 * @returns An object with three properties: "status", "data", and "message". The "status" property is
 * set to 300, indicating a successful operation. The "data" property contains the updated
 * "buddyContents" array, which has been written to a JSON file. The "message" property is a string
 * indicating that the details have been added successfully.
 */
const addBuddy = (buddyContents, body) => {
    let status;
    let message;
    buddyContents.push(body);

    writeFileSync("./assets/cdw_ace23_buddies.json", JSON.stringify(buddyContents));
    
    status = 300;
    message = "Details added successfully!";
    console.log(body);
    return {
        "status": status,
        "data": buddyContents,
        "message": message
    }
}

/* Exporting the function `addBuddy` so that it can be used in other files. */
module.exports = { addBuddy };