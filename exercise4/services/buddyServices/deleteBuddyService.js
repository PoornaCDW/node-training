const { readFile, writeFile } = require('fs');

/**
 * It reads the file, deletes the buddy with the given ID, and writes the file
 * @param body - The body of the request.
 * @returns A promise is being returned with a message.
 */
const deleteBuddy = async (body) => {
    let deleteData;
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
                    buddyContents.splice(index, 1);
                    writeFile("./assets/cdw_ace23_buddies.json", JSON.stringify(buddyContents), (err) => {
                        if(err) {
                            status = 404;
                            message = "Error while writing the file.";
                            reject(err);
                        } else {
                            status = 300;
                            message = "Deleted successfully!";
                            resolve(buddyContents);
                        }
                    });
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
            deleteData = data;
        }
    );

    return {
        "status": status,
        "data": deleteData,
        "message": message
    };
}

/* Exporting the function `deleteBuddy` so that it can be used in other files. */
module.exports = { deleteBuddy };