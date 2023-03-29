/* Importing the functions from the files in the buddyServices folder. */
const deleteBuddyService = require("../services/buddyServices/deleteBuddyService");
const postBuddyService = require("../services/buddyServices/postBuddyService");
const getBuddyService = require("../services/buddyServices/getBuddyServices");
const putBuddyService = require("../services/buddyServices/putBuddyService");

/**
 * It takes a request and response object, sends the response of the postBuddyService.addBuddy
 * function, which takes the request body as a parameter
 * @param request - This is the request object that contains the data sent from the client.
 * @param response - The response object that will be sent back to the client.
 */
const addBuddy = async (request, response) => {
    response.send(await postBuddyService.addBuddy(request.body));
}

/**
 * It takes a request and response object, sends the response of the updateBuddyService.updateBuddy
 * function, which takes the request body as a parameter
 * @param request - This is the request object that contains the data sent from the client.
 * @param response - The response object that will be sent back to the client.
 */
const updateBuddy = async (request, response) => {
    response.send(await putBuddyService.updateBuddy(request.body));
}

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
    addBuddy,
    updateBuddy,
    deleteBuddy,
    listBuddy,
    listAllBuddies
};