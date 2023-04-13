const { writeFileSync } = require('fs');
const { sortBy } = require('lodash');

/**
 * The function adds a new task to a task list and returns a success message with the added task.
 * @param taskData - An array of task objects that will be updated with the new task.
 * @param body - The `body` parameter is an object that contains the data for the task that needs to be
 * added. It could contain properties such as `title`, `description`, `dueDate`, `priority`, etc.
 * @param authenticationData - It is an object that contains the user's authentication data, such as
 * their username and user ID. This data is used to create a unique file name for the JSON file that
 * stores the user's tasks.
 * @returns an object with three properties: "status", "data", and "message". The "status" property has
 * a value of 201, indicating that the request has been successfully fulfilled and a new resource has
 * been created. The "data" property contains the task data that was added to the taskData array. The
 * "message" property contains a success message indicating that the task was
 */
const addTask = (taskData, body, authenticationData) => {
    taskData.push(body);
    writeFileSync(`./assets/${authenticationData.userName}_${authenticationData.userId}_tasks.json`, JSON.stringify(taskData));

    return  {
        "status": 201,
        "data": body, 
        "message": "Task added successfully!"
    };
}

/**
 * The function returns a JSON object with a status code, task data, and a message.
 * @param taskData - `taskData` is a parameter that represents the data of a task. It is used as an
 * input to the `readTask` function, which returns an object with a status code of 201, the task data,
 * and a message indicating that all tasks have been retrieved.
 * @returns A JavaScript object with three properties: "status", "data", and "message". The "status"
 * property has a value of 201, the "data" property has a value of the input parameter "taskData", and
 * the "message" property has a value of "All tasks!".
 */
const readTask = (taskData) => {
    return  {
        "status": 201,
        "data": taskData, 
        "message": "All tasks!"
    };
}

/**
 * The function filters task data based on a query and returns a response object with status, data, and
 * message properties.
 * @param taskData - The taskData parameter is an array of objects that contains information about
 * tasks. Each object represents a task and has properties such as task name, description, status, etc.
 * @param query - The `query` parameter is an object that contains key-value pairs representing the
 * filters to be applied on the `taskData` array. The function filters the `taskData` array based on
 * these filters and returns the filtered tasks. If no tasks are found after filtering, it returns a
 * 404 status
 * @returns The function `filterTask` returns an object with three properties: `status`, `data`, and
 * `message`. The value of the `status` property is either 404 or 201 depending on whether any tasks
 * were found or not. The value of the `data` property is either the filtered task data or the query
 * object that was passed in. The value of the `message` property is
 */
const filterTask = (taskData, query) => {
    const filteredTask = taskData.filter((task) => {
      let flag = true;
      for (key in query) {
        flag = flag && task[key] == query[key];
      }
      return flag;
    });
    if(filteredTask.length === 0) {
        return {
            "status": 404,
            "data": query, 
            "message": "No tasks were found!"
        }
    } else {
        return {
            "status": 201,
            "data": filteredTask, 
            "message": "Filtered tasks!"
        }
    }
}

/**
 * The function sorts task data based on a given query and returns a success message with the sorted
 * data.
 * @param taskData - The taskData parameter is an array of objects that contains information about
 * tasks. Each object represents a task and has properties such as task name, description, due date,
 * etc.
 * @param query - The "query" parameter in the "sortTask" function is a string that specifies the
 * property by which the "taskData" array should be sorted. For example, if the query is "priority",
 * the "taskData" array will be sorted by the "priority" property of each task object
 * @returns A JavaScript object with three properties: "status", "data", and "message". The "status"
 * property has a value of 201, indicating a successful response. The "data" property contains the
 * sorted task data based on the provided query. The "message" property contains a string message
 * indicating that the tasks have been sorted.
 */
const sortTask = (taskData, query) => {
    return {
        "status": 201,
        "data": sortBy(taskData, query), 
        "message": "Sorted tasks!"
    };
}

/**
 * The function reads a specific task from task data based on a given query and returns a response
 * object with status, data, and message properties.
 * @param taskData - an array of task objects, each containing information about a specific task
 * @param query - The query parameter is the ID of the task that we want to search for in the taskData
 * array. It is used to find a specific task object in the array.
 * @returns The function `readSpecificTask` returns an object with three properties: `status`, `data`,
 * and `message`. The value of the `status` property is either 201 or 404 depending on whether the task
 * with the given ID was found or not. The value of the `data` property is either the task object with
 * the given ID or the ID itself. The value of the `
 */
const readSpecificTask = (taskData, query) => {
    let index = -1;
    index = taskData.findIndex(tasks => tasks.taskId == query);
    if(index !== -1) {
        return {
            "status": 201,
            "data": taskData[index],
            "message": `Task with ID - ${query} was found!`
        };
    }  else {
        return {
            "status": 404,
            "data": query,
            "message": `Task with ID - ${query} was not found!`
        };
    }
}

/**
 * The function updates a task in a task list and returns a status code, updated data, and a message.
 * @param taskData - an array of objects containing task information
 * @param query - The query parameter is the ID of the task that needs to be updated.
 * @param body - The `body` parameter is an object that contains the updated information for a task. It
 * can have the following properties: `title`, `description`, `priority`, and `dueDate`. These
 * properties are used to update the corresponding task in the `taskData` array.
 * @param authenticationData - It is an object containing information about the user who is
 * authenticated and making the request. It may include properties such as userName and userId. This
 * information can be used to ensure that the user has the necessary permissions to update the task.
 * @returns an object with three properties: "status", "data", and "message". The "status" property
 * indicates the status code of the response (either 404 or 201). The "data" property contains the
 * updated task data if the task was successfully updated, or the original task data if the task was
 * not found. The "message" property contains a message indicating whether the task
 */
const updateTask = (taskData, query, body, authenticationData) => {
    let flag = true;
    for(task of taskData) {
        if(query === task.taskId) {
            task.title = body.title;
            task.description = body.description;
            task.priority = body.priority;
            task.dueDate = body.dueDate;
            task.taskComments = body.taskComments;
            flag = false;
        }
    }
    if(flag) {
        return {
            "status": 404,
            "data": taskData,
            "message": `Task with ID - ${query} does not exist!`
        };
    }
    else {
        writeFileSync(`./assets/${authenticationData.userName}_${authenticationData.userId}_tasks.json`, JSON.stringify(taskData));
        return {
            "status": 201,
            "data": body,
            "message": `Task with ID - ${query} was updated!`
        };
    }
}

/**
 * This function deletes a task from a task list and returns a success message.
 * @param taskData - An array of task objects that contains information about all the tasks.
 * @param query - The `query` parameter is the ID of the task that needs to be deleted from the
 * `taskData` array.
 * @param authenticationData - It is an object that contains information about the user who is
 * authenticated and authorized to perform the delete operation. It may include the user's username,
 * user ID, and any other relevant authentication data. This information is used to ensure that only
 * authorized users can delete tasks.
 * @returns an object with three properties: "status", "data", and "message". The "status" property has
 * a value of 201, indicating that the request was successful. The "data" property has a value of the
 * query parameter, which is the ID of the task that was deleted. The "message" property is a string
 * that confirms that the task with the specified ID
 */
const deleteTask = (taskData, query, authenticationData) => {
    let flag = false;
    for(const task of taskData) {
        if(task.taskId == query) {
            taskData.splice(taskData.indexOf(task), 1);
            flag = true;
        }
    }
    if(flag) {
        writeFileSync(`./assets/${authenticationData.userName}_${authenticationData.userId}_tasks.json`, JSON.stringify(taskData));
        return {
            "status": 201,
            "data": query,
            "message": `Task with ID - ${query} was deleted!`
        };
    } else {
        return {
            "status": 404,
            "data": query,
            "message": `Task with ID - ${query} was not found!`
        };
    }
}

module.exports = {  
    addTask,
    readTask,
    readSpecificTask,
    updateTask,
    deleteTask,
    filterTask,
    sortTask
};