const { readFile, writeFileSync, existsSync } = require('fs');
const logger = require('../utils/loggers');
require("dotenv").config();

const auth = require('../utils/auth');
const taskServices  = require('../services/taskServices');

/**
 * The function validates data for a task by checking if certain properties exist and meet specific
 * criteria.
 * @param data - The data parameter is an object that contains information about a task, including its
 * title, description, priority, due date, and an array of comments. The function is used to validate
 * whether the data object contains valid values for each of these properties.
 * @returns The function `validate` returns a boolean value. It returns `true` if all the conditions in
 * the function are met, and `false` if any of the conditions fail.
 */
const validate = (data)  =>{
    if (!data.title || data.title.trim() == "" || !((/^[a-z\sA-Z]{1,15}$/).test(data.title))) {
        return false;
    }
    if (!data.description || data.description.trim() == "" || !((/^[a-z\sA-Z]{1,30}$/).test(data.description))) {
        return false;
    }
    if (!data.priority || !((/^[0-9]{1,5}$/).test(data.priority))) {
        return false;
    }
    if (!data.dueDate || data.dueDate.trim() == "" || !((/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/).test(data.dueDate))) {
        return false;
    }
    if (!data.taskComments || !Array.isArray(data.taskComments)) {
        return false;
    }
    return true;
}

/**
 * The function adds a task to a JSON file after verifying the user's authentication token.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request body, request method, and request URL.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods and properties that allow the server to send data,
 * set headers, and control the status code of the response.
 */
const addTask = (request, response) => {
    const authenticationResponse = auth.verifyToken(request.headers.authorization);
    if(authenticationResponse.status == 290) {
        try {
            if(!existsSync(`./assets/${authenticationResponse.data.userName}_${authenticationResponse.data.userId}_tasks.json`)) {
                writeFileSync(`./assets/${authenticationResponse.data.userName}_${authenticationResponse.data.userId}_tasks.json`, JSON.stringify([]));
            }
            try {
                readFile(`./assets/${authenticationResponse.data.userName}_${authenticationResponse.data.userId}_tasks.json`, async (err, data) => {
                    if (err) {
                        logger.error(`${err.status || 404} - ${"File was not found!"} - ${err.message}`);
                        response.status(404).json({
                            "status": 404,
                            "data": request.body,
                            "message": "File was not found!"
                        });
                    } else {
                        if(validate(request.body)) {
                            let index = -1;
                            const tasks = JSON.parse(data);
                            index = tasks.findIndex(task => task.taskId === request.body.taskId);
                            if(index !== -1) {
                                response.status(409).json({
                                    "status": 409,
                                    "data": request.body,
                                    "message": `Task with ID - ${request.body.taskId} already exists!`
                                });
                            }  else {
                                const addServiceResponse = taskServices.addTask(tasks, request.body, authenticationResponse.data);
                                response.status(addServiceResponse.status).send(addServiceResponse);
                            }
                        } else {
                            response.status(409).json({
                                "status": 409,
                                "data": request.body,
                                "message": "Invalid data format!"
                            });
                        }
                    }
                });
            } catch (error) {
                logger.error(`${error.status || 404} - ${"File was not found!"} - ${error.message}`);
                response.status(404).json({
                    "status": 404,
                    "data": request.body,
                    "message": "File was not found!"
                });
            }
        } catch (error) {
            logger.error(`${error.status || 404} - ${"File was not found!"} - ${error.message}`);
            response.status(404).json({
                "status": 404,
                "data": request.body,
                "message": "File was not written!"
            });
        }
    } else {
        response.status(401).json({
            "status": 401,
            "message": "Unauthorized Access!"
        });
    }
}

/**
 * The function reads a task from a JSON file and returns a response based on the authentication status
 * of the user.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request body, and request method.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods and properties that allow the server to send data,
 * set headers, and control the status code of the response.
 */
const readTask = (request, response) => {
    const authenticationResponse = auth.verifyToken(request.headers.authorization);
    if(authenticationResponse.status == 290) {
        try {
            readFile(`./assets/${authenticationResponse.data.userName}_${authenticationResponse.data.userId}_tasks.json`, async (err, data) => {
                if (err) {
                    logger.error(`${err.status || 404} - ${"File was not found!"} - ${err.message}`);
                    response.status(404).json({
                        "status": 404,
                        "data": request.body,
                        "message": "File was not found!"
                    });
                } else {
                    const tasks = JSON.parse(data);
                    if(request.query.sort){
                        const sortResponse = taskServices.sortTask(tasks, request.query.sort);
                        response.status(sortResponse.status).send(sortResponse);
                    } else if(!(Object.keys(request.query) == 0)) {
                        const filterResponse = taskServices.filterTask(tasks, request.query);
                        response.status(filterResponse.status).send(filterResponse);
                    } else {
                        const readTaskReasponse = taskServices.readTask(tasks, authenticationResponse.data);
                        response.status(readTaskReasponse.status).send(readTaskReasponse);
                    }
                }
            });
        } catch (error) {
            logger.error(`${error.status || 404} - ${"File was not found!"} - ${error.message}`);
            response.status(404).json({
                "status": 404,
                "data": request.body,
                "message": "File was not found!"
            });
        }
    } else {
        response.status(401).json({
            "status": 401,
            "message": "Unauthorized Access!"
        });
    }
}

/**
 * The function reads a specific task from a JSON file and returns it as a response, after verifying
 * the user's authentication token.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request body, request parameters, etc.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods and properties that allow the server to send data,
 * set headers, and control the status code of the response.
 */
const readSpecificTask = (request, response) => {
    const authenticationResponse = auth.verifyToken(request.headers.authorization);
    if(authenticationResponse.status == 290) {
        try {
            readFile(`./assets/${authenticationResponse.data.userName}_${authenticationResponse.data.userId}_tasks.json`, async (err, data) => {
                if (err) {
                    logger.error(`${err.status || 404} - ${"File was not found!"} - ${err.message}`);
                    response.status(404).json({
                        "status": 404,
                        "data": request.body,
                        "message": "File was not found!"
                    });
                } else {
                    const tasks = JSON.parse(data);
                    const readTaskReasponse = taskServices.readSpecificTask(tasks, request.params.taskId);
                    response.status(readTaskReasponse.status).send(readTaskReasponse);
                }
            });
        } catch (error) {
            logger.error(`${error.status || 404} - ${"File was not found!"} - ${error.message}`);
            response.status(404).json({
                "status": 404,
                "data": request.body,
                "message": "File was not found!"
            });
        }
    } else {
        response.status(401).json({
            "status": 401,
            "message": "Unauthorized Access!"
        });
    }
}

/**
 * The function updates a task in a JSON file based on the task ID and authentication token provided in
 * the request.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request body, request parameters, etc.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods and properties that allow the server to send data,
 * set headers, and control the status code of the response.
 */
const updateTask = (request, response) => {
    const authenticationResponse = auth.verifyToken(request.headers.authorization);
    if(authenticationResponse.status == 290) {
        try {
            readFile(`./assets/${authenticationResponse.data.userName}_${authenticationResponse.data.userId}_tasks.json`, async (err, data) => {
                if (err) {
                    logger.error(`${err.status || 404} - ${"File was not found!"} - ${err.message}`);
                    response.status(404).json({
                        "status": 404,
                        "data": request.body,
                        "message": "File was not found!"
                    });
                } else {
                    if(validate(request.body)) {
                        const tasks = JSON.parse(data);
                        const updateServiceResponse = taskServices.updateTask(tasks, request.params.taskId, request.body, authenticationResponse.data);
                        response.status(updateServiceResponse.status).send(updateServiceResponse);
                    } else {
                        response.status(404).json({
                            "status": 404,
                            "data": request.body,
                            "message": "Invalid data format!"
                        });
                    }
                }
            });
        } catch (error) {
            logger.error(`${error.status || 404} - ${"File was not found!"} - ${error.message}`);
            response.status(404).json({
                "status": 404,
                "data": request.body,
                "message": "File was not found!"
            });
        }
    } else {
        response.status(401).json({
            "status": 401,
            "message": "Unauthorized Access!"
        });
    }
}

/**
 * The function deletes a task from a JSON file if the user is authenticated, and returns an error
 * message if the file is not found or the user is unauthorized.
 * @param request - The request parameter is an object that contains information about the HTTP request
 * made by the client, such as the request headers, request body, request method, and request
 * parameters.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods and properties that allow the server to send data,
 * set headers, and control the status code of the response.
 */
const deleteTask = (request, response) => {
    const authenticationResponse = auth.verifyToken(request.headers.authorization);
    if(authenticationResponse.status == 290) {
        try {
            readFile(`./assets/${authenticationResponse.data.userName}_${authenticationResponse.data.userId}_tasks.json`, async (err, data) => {
                if (err) {
                    logger.error(`${err.status || 404} - ${"File was not found!"} - ${err.message}`);
                    response.status(404).json({
                        "status": 404,
                        "data": request.body,
                        "message": "File was not found!"
                    });
                } else {
                    const tasks = JSON.parse(data);
                    const deleteTaskResponse = taskServices.deleteTask(tasks, request.params.taskId, authenticationResponse.data);
                    response.status(deleteTaskResponse.status).send(deleteTaskResponse);
                }
            });
        } catch (error) {
            logger.error(`${error.status || 404} - ${"File was not found!"} - ${error.message}`);
            response.status(404).json({
                "status": 404,
                "data": request.body,
                "message": "File was not found!"
            });
        }
    } else {
        response.status(401).json({
            "status": 401,
            "message": "Unauthorized Access!"
        });
    }
}

module.exports = {
    addTask,
    readTask,
    readSpecificTask,
    updateTask,
    deleteTask
}