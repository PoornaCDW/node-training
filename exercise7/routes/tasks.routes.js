const expressApp = require('express');
const router = expressApp.Router();

const taskControllers = require('../controllers/taskController')

router.post("/addTask", taskControllers.addTask);

router.get("/readTask", taskControllers.readTask);

router.get("/readSpecificTask/:taskId", taskControllers.readSpecificTask);

router.put("/updateTask/:taskId", taskControllers.updateTask);

router.delete("/deleteTask/:taskId", taskControllers.deleteTask);

module.exports = router;