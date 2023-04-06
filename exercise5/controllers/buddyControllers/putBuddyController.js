/* This is importing the putBuddyService from the services folder. */
const putBuddyService = require("../../services/buddyServices/putBuddyService");
const logger = require('../../loggers/logger');
const { readFile } = require("fs");

/**
 * It takes a request and response object, sends the response of the updateBuddyService.updateBuddy
 * function, which takes the request body as a parameter
 * @param request - This is the request object that contains the data sent from the client.
 * @param response - The response object that will be sent back to the client.
 */
const updateBuddy = (request, response) => {
    // response.send(await putBuddyService.updateBuddy(request.body));
    try {
        readFile("./assets/cdw_ace23_buddies.json", (err, data) => {
            if(err) {
                logger.error(`${err.status || 404} - ${"File was not found!"} - ${err.message}`);
                response.status(404).json({
                    "status": 404,
                    "data": request.body,
                    "message": "File was not found!"
                });
            } else {
                let buddyContents = JSON.parse(data);
                const result = putBuddyService.updateBuddy(buddyContents, request.body);
                response.send(result);
            }
        });
    } catch (error) {
        logger.error(`${err.status || 404} - ${"File was not found!"} - ${err.message}`);
        response.status(404).json({
            "status": 404,
            "data": request.body,
            "message": "File was not found!"
        });
    }
}

/* Exporting the functions to be used in other files. */
module.exports = { updateBuddy };