/* This is importing the deleteBuddyService from the services folder. */
const deleteBuddyService = require("../../services/buddyServices/deleteBuddyService");
const logger = require('../../loggers/logger');
const { readFile } = require("fs");

/**
 * It takes a request and response object, and sends the response of the deleteBuddyService.deleteBuddy
 * function, which takes the request body as a parameter
 * @param request - The request object contains information about the HTTP request that raised the
 * event. It has properties for the request query string, parameters, body, HTTP headers, and so on.
 * @param response - The response object that will be sent back to the client.
 */
const deleteBuddy = (request, response) => {
    // response.send(await deleteBuddyService.deleteBuddy(request.body));
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
                const result = deleteBuddyService.deleteBuddy(buddyContents, request.body);
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
module.exports = { deleteBuddy };