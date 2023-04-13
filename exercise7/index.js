const { existsSync, writeFileSync } = require("fs");
const express = require("express");
const expressApp = express();
const cors = require("cors");
require("dotenv").config();

/* Importing routes */
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/tasks.routes');
const auth = require('./utils/auth');

/* `expressApp.use(express.urlencoded( {extended: false} ));` is a middleware function that parses
incoming requests with urlencoded payloads and is based on body-parser. */
expressApp.use(express.urlencoded( {extended: false} ));
expressApp.use(express.json());

/* `expressApp.use(cors({ origin: "*" }))` is enabling Cross-Origin Resource Sharing (CORS) for all
routes in the Express application. CORS is a security feature implemented by web browsers that
restricts web pages from making requests to a different domain than the one that served the web
page. */
expressApp.use(cors({
    origin: "*"
}));

/* `expressApp.use('/users', userRoutes);` is mounting the `userRoutes` middleware at the `/users`
path. */
expressApp.use('/users', userRoutes);

/* `expressApp.use('/tasks', taskRoutes);` is mounting the `taskRoutes` middleware at the `/tasks`
path. */
expressApp.use('/tasks', taskRoutes);

/* This code is defining a route for the HTTP POST method at the path "/authenticate" in the Express
application. The route has two middleware functions: `auth.verifyToken` and `(req, res) => {
res.send("Valid User"); }`. */
expressApp.post("/authenticate", auth.verifyToken, (req, res) => {
    res.send("Valid User");
});

/* `It is defining a middleware function that handles requests to the root path ("/") of the Express
application. When a request is made to the root path, the function sends the response "Base route!"
back to the client. This is a simple way to test if the server is running and responding to
requests. */
expressApp.use("/", (request, response) => {
    response.send("Base route!");
});

expressApp.listen(process.env.PORT, () => {
    console.log("Server started at port - "+process.env.PORT);
    if(!existsSync('./assets/users.json')) {
        writeFileSync("./assets/users.json", JSON.stringify([]));
    }
});

module.exports = expressApp;