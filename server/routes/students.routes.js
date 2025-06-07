const express = require("express");

// Import model
const Student = require("../models/Student");
const Cohort = require("../models/Cohort");
const router = express.Router();

const students = require("../students.json");

// STUDENT Routes
// -------------------------

// 1. Creates a new student
router.post("/api/students/", (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects,
  } = req.body;

  Student.create({
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects,
  })
    .then((createdStudent) => {
      console.log("The student was created!");
      res.status(201).json(createdStudent);
    })
    .catch((error) => {
      next(error);
    });
});

// 2. Retrieves all the students in the database collection
router.get("/api/students/", (req, res, next) => {
  // res.json(students);

  Student.find({})
    .populate("cohort")
    .then((allStudents) => {
      console.log("Retrived students!");
      res.status(200).json(allStudents);
    })
    .catch((error) => {
      next(error);
    });
});

// 3. Retrieves all of the students for a given cohort
router.get("/api/students/cohort/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  Cohort.findById(cohortId)
    .then((cohort) => {
      if (!cohort) {
        return res.status(404).json({ message: "Cohort not found" });
      }

      return Student.find({ cohort: cohortId })
        .populate("cohort")
        .then((students) => {
          console.log(
            `Retrived ${students.length} for cohort with id ${cohortId}`
          );
          res.status(200).json(students);
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
});

// 4. Retrieves a specific student by id
router.get("/api/students/:studentId", (req, res, next) => {
  const { studentId } = req.params;
  Student.findById(studentId)
    .populate("cohort")
    .then((foundedStudent) => {
      if (!foundedStudent) {
        res.status(404).json({ message: "Student doesn't exists" });
      }
      console.log("Student was founded!");
      res.status(200).json(foundedStudent);
    })
    .catch((error) => {
      next(error);
    });
});

// 5. Updates a specific student by id
router.put("/api/students/:studentId", (req, res, next) => {
  const { studentId } = req.params;
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects,
  } = req.body;

  Student.findByIdAndUpdate(
    studentId,
    {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      image,
      cohort,
      projects,
    },
    { new: true }
  )
    .then((updatedStudent) => {
      console.log("Student updated successfully!");
      res.status(200).json(updatedStudent);
    })
    .catch((error) => {
      next(error);
    });
});

// 6. Deletes a specific student by id
router.delete("/api/students/:studentId", (req, res, next) => {
  const { studentId } = req.params;

  Student.findByIdAndDelete(studentId)
    .then(() => {
      console.log("Student deleted successfully!");
      res.status(204).json({ message: "Student deleted!" });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
