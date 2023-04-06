/* This is importing the getBuddyServices.js file from the services folder. */
const getBuddyService = require("../../services/buddyServices/getBuddyServices");
const logger = require('../../loggers/logger');
const { readFile } = require("fs");

/**
 * It takes a request and response object, and sends the response of the listBuddyService.listBuddy
 * function, which takes the request body as a parameter
 * @param request - The request object contains information about the HTTP request that raised the
 * event.
 * @param response - The response object that will be sent back to the client.
 */
const listBuddy = (request, response) => {
    // response.send(await getBuddyService.listBuddy(request.body));
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
                const result = getBuddyService.listBuddy(buddyContents, request.body);
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

/**
 * It takes a request and a response, and sends the response of the listAllBuddies function in the
 * getBuddyService
 * @param request - This is the request object that contains the request parameters.
 * @param response - The response object that will be sent back to the client.
 */
const listAllBuddies = (request, response) => {
    // response.send(await getBuddyService.listAllBuddies());
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
                const result = getBuddyService.listAllBuddies(buddyContents);
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
module.exports = {
    listBuddy,
    listAllBuddies
};