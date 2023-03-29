const { readFile } = require("fs");

/**
 * It reads the JSON file and returns the details of the buddy with the given employee ID
 * @param body - The request body.
 * @returns a promise with a message.
 */
const listBuddy = async (body) => {
    let buddyData;
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
                    resolve(buddyContents[index]);
                } else {
                    resolve("Buddy details with the given ID wasn't found!");
                }
            }
        });
    });
    await promise.then(
        (data) => {
            buddyData = data;
        },
        (err) => {
            console.log(err);
        }
    );
    return buddyData;
}

/**
 * It reads the contents of a JSON file, parses it, and returns the parsed data
 * @returns A promise object
 */
const listAllBuddies = async () => {
    let allBuddiesData;
    let promise = new Promise((resolve, reject) => {
        readFile("./assets/cdw_ace23_buddies.json", (err, data) => {
            if(err) {
                reject(err);
            } else {
                let buddyContents = JSON.parse(data);
                resolve(buddyContents);
            }
        });
    });
    await promise.then(
        (data) => {
            allBuddiesData = data;
        }
    );
    return allBuddiesData;
}

/* Exporting the functions `listBuddy` and `listAllBuddies` so that they can be used in other files. */
module.exports = { 
    listBuddy,
    listAllBuddies
};