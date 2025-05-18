const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const taskRoutes = require("./routes");
const { errorHandler } = require("./middleware");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);

module.exports = app;