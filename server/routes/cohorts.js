const express = require("express");

// Import model
const Cohorts = require("../models/Cohorts");
const router = express.Router();

const cohorts = require("../cohorts.json");

// --- > COHORT Routes < ---
// -------------------------
// 1. Creates a new cohort
router.post("/api/cohorts/", (req, res) => {
  const {
    cohortSlug,
    cohortName,
    program,
    forma,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;

  Cohorts.create({
    cohortSlug,
    cohortName,
    program,
    forma,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  })
    .then((createdCohort) => {
      console.log("Cohort created!");
      res.status(201).json(createdCohort);
    })
    .catch((error) => {
      console.log("Error while creating the cohort!");
      res.status(500).json(error);
    });
});

// 2. Retrieves all the cohorts in the database collection
router.get("/api/cohorts", (req, res) => {
  //res.json(cohorts);

  Cohorts.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts!");
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      console.log("Error while retrieving cohorts:", error);
      res.status(500).json(error);
    });
});

// 4. Retrieves a specific cohort by id
router.get("/api/cohorts/:cohortId", (req, res) => {
  const {cohortId} = req.params;

  Cohorts.findById(cohortId)
    .then((foundedCohort) => {
      console.log(`The cohort with ${cohortId} was founded!`);
      res.status(200).json(foundedCohort);
    })
    .catch((error) => {
      console.log("Error while finding the given cohort", error);
      res.status(500).json(error);
    });
});

// 5. Updates a specific cohort by id
router.put("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  const {
    cohortSlug,
    cohortName,
    program,
    forma,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;

  Cohorts.findByIdAndUpdate(
    cohortId,
    {
      cohortSlug,
      cohortName,
      program,
      forma,
      campus,
      startDate,
      endDate,
      inProgress,
      programManager,
      leadTeacher,
      totalHours,
    },
    { new: true }
  )
    .then((updatedCohort) => {
      console.log("The cohort was updated!");
      res.status(200).json(updatedCohort);
    })
    .catch((error) => {
      console.log("Error while updating cohort!");
      res.status(500).json(error);
    });
});

// 6. Deletes a specific cohorts by id
router.delete("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;

  Cohorts.findByIdAndDelete(cohortId)
    .then(() => res.status(204).json({ message: "Cohort was deleted!" }))
    .catch((error) => {
      console.log("Error while deleting the cohort!");
      res.status(500).json(error);
    });
});

module.exports = router;
