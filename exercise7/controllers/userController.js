require("dotenv").config();
const { readFile } = require('fs');
const logger = require('../utils/loggers');

const userServices = require('../services/userServices');

const signUp = (request, response) => {
    try {
        readFile('./assets/users.json', async (err, data) => {
            if (err) {
                logger.error(`${err.status || 404} - ${"File was not found!"} - ${err.message}`);
                response.status(404).json({
                    "status": 404,
                    "data": request.body,
                    "message": "File was not found!"
                });
            } else {
                const userJsonContents = JSON.parse(data);
                let index = -1;
                index = userJsonContents.findIndex(user => user.userId === request.body.userId);
                if(index !== -1) {
                    response.status(409).json({
                        "status": 409,
                        "data": request.body,
                        "message": "User already exists!"
                    });
                } else {
                    const responseJson = await userServices.signUpService(userJsonContents, request.body);
                    response.status(290).send(responseJson);
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
}

const login = (request, response) => {
    try {
        let responseData = request.body;
        readFile('./assets/users.json', async (err, data) => {
            if (err) {
                logger.error(`${err.status || 404} - ${"File was not found!"} - ${err.message}`);
                response.status(404).json({
                    "status": 404,
                    "data": responseData,
                    "message": "File was not found!"
                });
            } else {
                const userJsonContents = JSON.parse(data);
                const responseJson = await userServices.loginService(userJsonContents, request.body);
                response.status(responseJson.status).send(responseJson);
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
}

module.exports = {
    signUp,
    login
}