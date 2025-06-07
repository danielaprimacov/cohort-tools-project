require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const PORT = 5005;

// Import the custom error handling middleware
const {
  errorHandler,
  notFoundHandler,
} = require("./middleware/error-handling.middleware");

const { isAuthenticated } = require("./middleware/jwt.middleware");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// const cohorts = require("./cohorts.json");
// const students = require("./students.json");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// Import Cohorts and Students Routes
app.use("/", [
  require("./routes/cohorts.routes"),
  require("./routes/students.routes"),
]);
app.use("/auth", require("./routes/auth.routes"));
app.use("/", isAuthenticated, require("./routes/user.routes"));

// Set up custom error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Mongoose conection with database
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));
