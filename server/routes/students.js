const express = require("express");

// Import model
const Students = require("../models/Students");
const Cohorts = require("../models/Cohorts");
const router = express.Router();

const students = require("../students.json");

// STUDENT Routes
// -------------------------

// 1. Creates a new student
router.post("/api/students/", (req, res) => {
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

  Students.create({
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
      console.log("The students was created!");
      res.status(201).json(createdStudent);
    })
    .catch((error) => {
      console.log("Error while creating the student");
      res.status(500).json(error);
    });
});

// 2. Retrieves all the students in the database collection
router.get("/api/students/", (req, res) => {
  // res.json(students);

  Students.find({})
    .populate("cohort")
    .then((allStudents) => {
      console.log("Retrived students!");
      res.status(200).json(allStudents);
    })
    .catch((error) => {
      console.log("Error while retrieving students");
      res.status(500).json(error);
    });
});

// 3. Retrieves all of the students for a given cohort
router.get("/api/students/cohort/:cohortId", (req, res) => {
  const { cohortId } = req.params;

  Cohorts.findById(cohortId).then((cohort) => {
    if (!cohort) {
       res.status(404).json({ message: "Cohort not found" });
    }

     Students.find({ cohort: cohortId })
      .populate("cohort")
      .then((students) => {
        console.log(
          `Retrived ${students.length} for cohort with id ${cohortId}`
        );
        res.status(200).json({ cohort: cohort, students: students });
      })
      .catch((error) => {
        console.log("Error while retrieving students by cohort!");
        res.status(500).json(error);
      });
  });
});

// 4. Retrieves a specific student by id
router.get("/api/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  Students.findById(studentId)
    .populate("cohort")
    .then((foundedStudent) => {
      if (!foundedStudent) {
        res.status(404).json({ message: "Student doesn't exists" });
      }
      console.log("Student was founded!");
      res.status(200).json(foundedStudent);
    })
    .catch((error) => {
      console.log("Error while finding students");
      res.status(500).json(error);
    });
});

// 5. Updates a specific student by id
router.put("/api/students/:studentId", (req, res) => {
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

  Students.findByIdAndUpdate(
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
      console.log("Error while updating student information!");
      res.status(500).json(error);
    });
});

// 6. Deletes a specific student by id
router.delete("/api/students/:studentId", (req, res) => {
  const { studentId } = req.params;

  Students.findByIdAndDelete(studentId)
    .then(() => {
      console.log("Student deleted successfully!");
      res.status(204).json({ message: "Student deleted!" });
    })
    .catch((error) => {
      console.log("Error while deleting student!");
      res.status(500).json(error);
    });
});

module.exports = router;
