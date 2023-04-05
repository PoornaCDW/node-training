/* This is importing the deleteBuddyService from the services folder. */
const deleteBuddyService = require("../../services/buddyServices/deleteBuddyService");

/**
 * It takes a request and response object, and sends the response of the deleteBuddyService.deleteBuddy
 * function, which takes the request body as a parameter
 * @param request - The request object contains information about the HTTP request that raised the
 * event. It has properties for the request query string, parameters, body, HTTP headers, and so on.
 * @param response - The response object that will be sent back to the client.
 */
const deleteBuddy = async (request, response) => {
    response.send(await deleteBuddyService.deleteBuddy(request.body));
}

/* Exporting the functions to be used in other files. */
module.exports = { deleteBuddy };