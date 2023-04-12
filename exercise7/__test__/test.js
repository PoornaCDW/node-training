const express = require('../index');
const supertest = require('supertest');

let token = null;

// SignUp testing with different test cases
describe("Sign Up", () => {
    test("Register New User", async () => {
        const response = await supertest(express).post('/users/signUp').send({
            "userId": "3",
            "userName": "saikishore",
            "password": "1234567890"
        });
        expect(response.body.message).toBe("Successfully Registered.");
    })
});

describe("Sign Up", () => {
    test("Register Existing User", async () => {
        const response = await supertest(express).post('/users/signUp').send({
            "userId": "1",
            "userName": "sai",
            "password": "poorna@28"
        });
        expect(response.body.message).toBe("User already exists!");
    })
});

// Login testing with different test cases
describe("Login", () => {
    test("Successful Login", async () => {
        const response = await supertest(express).post('/users/login').send({
            "userId": "1",
            "userName": "poorna",
            "password": "poorna@28"
        });
        expect(response.body.message).toBe("The login was successful!");
        token = response.body.data;
    })
});

describe("Login", () => {
    test("Wrong Password", async () => {
        const response = await supertest(express).post('/users/login').send({
            "userId": "1",
            "userName": "sai",
            "password": "poorna@2822"
        });
        expect(response.body.message).toBe("Wrong Password!");
    })
});

describe("Login", () => {
    test("User Not Found", async () => {
        const response = await supertest(express).post('/users/login').send({
            "userId": "8",
            "userName": "sai",
            "password": "poorna@2822"
        });
        expect(response.body.message).toBe("User not found!");
        expect(response.body.data).toBe(null);
    })
});

// Adding Task testing with different test cases
describe("Adding Task", () => {
    test("Unauthorised Access", async () => {
        const response = await supertest(express).post('/tasks/addTask').send({
            "taskId": "100",
            "title": "SQL Task",
            "description": "This is a SQL task",
            "priority": 15,
            "dueDate": "01-02-2023",
            "taskComments": ["finish task fast", "!important"],
            "timeStamp": 123532424
    });
        expect(response.body.message).toBe("Unauthorized Access!");
    })
});

describe("Adding Task", () => {
    test("Validation Error", async () => {
        const response = await supertest(express).post('/tasks/addTask').set("Authorization", `Bearer ${token}`).send({
            "taskId": "100",
            "title": "SQL Task",
            "description": "This is a SQL task",
            "priority": 15,
            "dueDate": "01-02-20233",
            "taskComments": ["finish task fast", "!important"],
            "timeStamp": 123532424
    });
        expect(response.body.message).toBe("Invalid data format!");
    })
});

describe("Adding Task", () => {
    test("Successful Addition", async () => {
        const response = await supertest(express).post('/tasks/addTask').set("Authorization", `Bearer ${token}`).send({
            "taskId": "100",
            "title": "SQL Task",
            "description": "This is a SQL task",
            "priority": 15,
            "dueDate": "01-02-2023",
            "taskComments": ["finish task fast", "!important"],
            "timeStamp": 123532424
    });
        expect(response.body.message).toBe("Task added successfully!");
    })
});

describe("Adding Task", () => {
    test("Unsuccessful Addition", async () => {
        const response = await supertest(express).post('/tasks/addTask').set("Authorization", `Bearer ${token}`).send({
            "taskId": "100",
            "title": "SQL Task",
            "description": "This is a SQL task",
            "priority": 15,
            "dueDate": "01-02-2023",
            "taskComments": ["finish task fast", "!important"],
            "timeStamp": 123532424
    });
        expect(response.body.message).toBe(`Task with ID - 100 already exists!`);
    })
});

// Reading Task testing with different test cases
describe("Reading Task", () => {
    test("Unauthorised Access", async () => {
        const response = await supertest(express).get('/tasks/readTask').send();
        expect(response.body.message).toBe("Unauthorized Access!");
    })
});

describe("Reading Task", () => {
    test("Successful retrival", async () => {
        const response = await supertest(express).get('/tasks/readTask').set("Authorization", `Bearer ${token}`).send();
        expect(response.body.message).toBe("All tasks!");
    })
});

describe("Reading Task", () => {
    test("Successful filter", async () => {
        const response = await supertest(express).get('/tasks/readTask?priority=23').set("Authorization", `Bearer ${token}`).send();
        expect(response.body.message).toBe("Filtered tasks!");
    })
});

describe("Reading Task", () => {
    test("Unsuccessful filter", async () => {
        const response = await supertest(express).get('/tasks/readTask?priority=23&title=Node').set("Authorization", `Bearer ${token}`).send();
        expect(response.body.message).toBe("No tasks were found!");
    })
});

describe("Reading Task", () => {
    test("Successful sort", async () => {
        const response = await supertest(express).get('/tasks/readTask?sort=priority').set("Authorization", `Bearer ${token}`).send();
        expect(response.body.message).toBe("Sorted tasks!");
    })
});

// Reading Specific Task with with different test cases
describe("Reading Specific Task", () => {
    test("Unauthorised Access", async () => {
        const response = await supertest(express).get('/tasks/readSpecificTask/2').send();
        expect(response.body.message).toBe("Unauthorized Access!");
    })
});

describe("Reading Specific Task", () => {
    test("Successful retrival", async () => {
        const response = await supertest(express).get('/tasks/readSpecificTask/2').set("Authorization", `Bearer ${token}`).send();
        expect(response.body.message).toBe(`Task with ID - 2 was found!`);
    })
});

describe("Reading Specific Task", () => {
    test("Unsuccessful retrival", async () => {
        const response = await supertest(express).get('/tasks/readSpecificTask/222').set("Authorization", `Bearer ${token}`).send();
        expect(response.body.message).toBe(`Task with ID - 222 was not found!`);
    })
});

// Updating Task testing with different test cases
describe("Update Task", () => {
    test("Unauthorised Access", async () => {
        const response = await supertest(express).put('/tasks/updateTask/2').send();
        expect(response.body.message).toBe("Unauthorized Access!");
    })
});

describe("Update Task", () => {
    test("Validation Error", async () => {
        const response = await supertest(express).put('/tasks/updateTask/2').set("Authorization", `Bearer ${token}`).send({
            "title": "SQL Task",
            "description": "This is a SQL task",
            "priority": 150,
            "dueDate": "100-02-2023",
            "taskComments": ["finish task fast", "!important"]
        });
        expect(response.body.message).toBe("Invalid data format!");
    })
});

describe("Update Task", () => {
    test("Successful Updation", async () => {
        const response = await supertest(express).put('/tasks/updateTask/2').set("Authorization", `Bearer ${token}`).send({
            "title": "SQL Task",
            "description": "This is a SQL task",
            "priority": 14,
            "dueDate": "10-02-2023",
            "taskComments": ["finish task fast", "!important"]
        });
        expect(response.body.message).toBe(`Task with ID - 2 was updated!`);
    })
});

describe("Update Task", () => {
    test("Unsuccessful Updation", async () => {
        const response = await supertest(express).put('/tasks/updateTask/290').set("Authorization", `Bearer ${token}`).send({
            "title": "SQL Task",
            "description": "This is a SQL task",
            "priority": 14,
            "dueDate": "10-02-2023",
            "taskComments": ["finish task fast", "!important"]
        });
        expect(response.body.message).toBe(`Task with ID - 290 does not exist!`);
    })
});

// Deleting Task testing with different test cases
describe("Delete Task", () => {
    test("Unauthorised Access", async () => {
        const response = await supertest(express).delete('/tasks/deleteTask/2').send();
        expect(response.body.message).toBe("Unauthorized Access!");
    })
});

describe("Delete Task", () => {
    test("Successful Deletion", async () => {
        const response = await supertest(express).delete('/tasks/deleteTask/100').set("Authorization", `Bearer ${token}`).send();
        expect(response.body.message).toBe(`Task with ID - 100 was deleted!`);
    })
});

describe("Delete Task", () => {
    test("Successful Deletion", async () => {
        const response = await supertest(express).delete('/tasks/deleteTask/101').set("Authorization", `Bearer ${token}`).send();
        expect(response.body.message).toBe(`Task with ID - 101 was not found!`);
    })
});