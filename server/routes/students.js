const express = require("express");

// Import model
const Students = require("../models/Students");
const router = express.Router();

const students = require("../students.json");

// STUDENT Routes
// -------------------------

// 1. Creates a new student

// 2. Retrieves all the students in the database collection
router.get("/api/students", (req, res) => {
  res.json(students);
});
// 3. Retrieves all of the students for a given cohort
// 4. Retrieves a specific student by id
// 5. Updates a specific student by id
// 6. Deletes a specific student by id

module.exports = router;
