/* Importing the postBuddyService.js file from the services/buddyServices folder. */
const postBuddyService = require("../../services/buddyServices/postBuddyService");

/**
 * It takes a request and response object, sends the response of the postBuddyService.addBuddy
 * function, which takes the request body as a parameter
 * @param request - This is the request object that contains the data sent from the client.
 * @param response - The response object that will be sent back to the client.
 */
const addBuddy = async (request, response) => {
    response.send(await postBuddyService.addBuddy(request.body));
}

/* Exporting the functions to be used in other files. */
module.exports = { addBuddy };