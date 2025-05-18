const Task = require("./models");

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        const task = new Task({
            title,
            description,
            status: status || 'pending', // default to 'pending' if not provided
        });

        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get tasks, optionally filtered by status
const getTasks = async (req, res) => {
    try {
        const { status } = req.query;

        let query = {};
        if (status) {
            query.status = status;
        }

        const tasks = await Task.find(query);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Toggle task status (e.g., pending → ongoing → completed)
const toggleTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        // Toggle status in a cycle
        const statuses = ['pending', 'ongoing', 'completed'];
        const currentIndex = statuses.indexOf(task.status);
        const nextIndex = (currentIndex + 1) % statuses.length;

        task.status = statuses[nextIndex];
        await task.save();

        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Update a task
const updateTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Update fields if provided
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (status !== undefined) task.status = status;

        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a single task by ID
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete all tasks
const deleteAllTasks = async (req, res) => {
    try {
        await Task.deleteMany({});
        res.json({ message: 'All tasks deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createTask,
    getTasks,
    toggleTask,
    updateTask,
    deleteTask,
    deleteAllTasks,
};
