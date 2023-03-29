/* This is importing the getBuddyServices.js file from the services folder. */
const getBuddyService = require("../../services/buddyServices/getBuddyServices");

/**
 * It takes a request and response object, and sends the response of the listBuddyService.listBuddy
 * function, which takes the request body as a parameter
 * @param request - The request object contains information about the HTTP request that raised the
 * event.
 * @param response - The response object that will be sent back to the client.
 */
const listBuddy = async (request, response) => {
    response.send(await getBuddyService.listBuddy(request.body));
}

/**
 * It takes a request and a response, and sends the response of the listAllBuddies function in the
 * getBuddyService
 * @param request - This is the request object that contains the request parameters.
 * @param response - The response object that will be sent back to the client.
 */
const listAllBuddies = async (request, response) => {
    response.send(await getBuddyService.listAllBuddies());
}

/* Exporting the functions to be used in other files. */
module.exports = {
    listBuddy,
    listAllBuddies
};