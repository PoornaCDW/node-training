const { hash, compare } = require('bcrypt');
const { sign } = require("jsonwebtoken");
const { writeFileSync } = require('fs');
require("dotenv").config();

/**
 * The function `signUpService` takes in user data and a password, hashes the password, adds the user
 * details to a JSON file, and returns a success message.
 * @param userData - It is an array of objects that contains the details of all the registered users.
 * Each object in the array represents a user and contains their userId, userName, and password.
 * @param body - The `body` parameter is an object that contains the user's registration details,
 * including their `userId`, `userName`, and `password`.
 * @returns The function `signUpService` is returning an object with three properties: `status`,
 * `data`, and `message`. The `status` property has a value of 290, indicating a successful
 * registration. The `data` property contains the user details, including the hashed password. The
 * `message` property contains a success message.
 */
const signUpService = async (userData, body) => {
    let hashedPassword;
    hashedPassword = await hash(body.password, parseInt(process.env.SALTROUNDS));
    const userDetails = {
        "userId": body.userId,
        "userName": body.userName,
        "password": hashedPassword
    }
    userData.push(userDetails);
    writeFileSync('./assets/users.json', JSON.stringify(userData));
    return {
        "status": 290,
        "data": userDetails,
        "message": "Successfully Registered."
    };
}

/**
 * The function performs a login service by checking user credentials and returning a token if
 * successful.
 * @param userData - An array of user objects containing user information such as userId and password.
 * @param body - The `body` parameter is an object that contains the user's login credentials,
 * including their `userId` and `password`.
 * @returns An object with three properties: "status", "data", and "message". The values of these
 * properties depend on the logic of the function and the input parameters.
 */
const loginService = async (userData, body) => {
    let status, message;
    let responseData = null;
    let index = -1;
    index = userData.findIndex(user => user.userId === body.userId);
    if(index !== -1) {
        if(body.userName == userData[index].userName && await compare(body.password, userData[index].password)) {
            const token = sign(userData[index], process.env.JWTSECRETKEY, { expiresIn: "24h" });
            status = 290;
            responseData = token;
            message = "The login was successful!";
        } else {
            status = 404;
            message = "Wrong Username or Password!";   
        }
    } else {
        status = 409;
        message = "User not found!";
    }

    return {
        "status": status,
        "data": responseData,
        "message": message
    };
}

// Exporting modules
module.exports = {
    signUpService,
    loginService
};