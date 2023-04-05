const { readFile } = require("fs");
const { readFileHelper, writeFileHelper } = require("./fileHelperServise");

/**
 * It reads the JSON file and returns the details of the buddy with the given employee ID
 * @param body - The request body.
 * @returns a promise with a message.
 */
const listBuddy = async (body) => {
    let buddyData;
    let status;
    let message;
    let promise = new Promise((resolve, reject) => {
        readFile("./assets/cdw_ace23_buddies.json", (err, data) => {
            if(err) {
                status = 404;
                message = "Error while reading the file.";
                reject(err);
            } else {
                let index = -1;
                let buddyContents = JSON.parse(data);
                index = buddyContents.findIndex(buddy => buddy.employeeId === body.employeeId);
                if(index !== -1) {
                    status = 300;
                    message = `The record with the employee ID - ${body.employeeId} was found!`;
                    resolve(buddyContents[index]);
                } else {
                    status = 404;
                    message = `The record with the employee ID - ${body.employeeId} was not found!`;
                    resolve(body);
                }
            }
        });
    });
    await promise.then(
        (data) => {
            buddyData = data;
        }
    );

    return {
        "status": status,
        "data": buddyData,
        "message": message
    };
}

/**
 * It reads the contents of a JSON file, parses it, and returns the parsed data
 * @returns A promise object
 */
const listAllBuddies = async () => {
    let allBuddiesData;
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
                status = 300;
                message = `All buddies details!`;
                resolve(buddyContents);
            }
        });
        // let test = readFileHelper("./assets/cdw_ace23_buddies");
        // console.log(test);
    });
    await promise.then(
        (data) => {
            allBuddiesData = data;
        }
    );
    return {
        "status": status,
        "data": allBuddiesData,
        "message": message
    };
}

/* Exporting the functions `listBuddy` and `listAllBuddies` so that they can be used in other files. */
module.exports = { 
    listBuddy,
    listAllBuddies
};