const express = require("express");
const router = express.Router();
const {
    createTask,
    getTasks,
    toggleTask,
    updateTask,
    deleteTask,
    deleteAllTasks,
} = require("./controllers");

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", toggleTask);
router.put('/update/:id', updateTask);
router.delete("/:id", deleteTask);
router.delete('/', deleteAllTasks);
module.exports = router;