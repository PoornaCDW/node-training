/* This is importing the putBuddyService from the services folder. */
const putBuddyService = require("../../services/buddyServices/putBuddyService");

/**
 * It takes a request and response object, sends the response of the updateBuddyService.updateBuddy
 * function, which takes the request body as a parameter
 * @param request - This is the request object that contains the data sent from the client.
 * @param response - The response object that will be sent back to the client.
 */
const updateBuddy = async (request, response) => {
    response.send(await putBuddyService.updateBuddy(request.body));
}

/* Exporting the functions to be used in other files. */
module.exports = { updateBuddy };