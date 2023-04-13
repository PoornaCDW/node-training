let { verify } = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (authorizationKey) => {
    let token;
    let decoded;
    try {
        token = (authorizationKey).split(' ')[1];
        if(token) {
            decoded = verify(token, process.env.JWTSECRETKEY);
            return {
                "status": 290,
                "data": decoded,
                "message": "Token Verified!"
            };
        }
        return {
            "status": 404,
            "data": null,
            "message": "Token Not Found!"
        };
    } catch(err) {
        return {
            "status": 404,
            "data": null,
            "message": err.message
        };
    }
}

module.exports = {
    verifyToken
};