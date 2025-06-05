const express = require("express");

// Import model
const Cohort = require("../models/Cohort");
const router = express.Router();

const cohorts = require("../cohorts.json");

// --- > COHORT Routes < ---
// -------------------------
// 1. Creates a new cohort
router.post("/api/cohorts/", (req, res, next) => {
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

  Cohort.create({
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
      next(error);
    });
});

// 2. Retrieves all the cohorts in the database collection
router.get("/api/cohorts", (req, res) => {
  //res.json(cohorts);

  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts!");
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      next(error);
    });
});

// 4. Retrieves a specific cohort by id
router.get("/api/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  Cohort.findById(cohortId)
    .then((foundedCohort) => {
      console.log(`The cohort with ${cohortId} was founded!`);
      res.status(200).json(foundedCohort);
    })
    .catch((error) => {
      next(error);
    });
});

// 5. Updates a specific cohort by id
router.put("/api/cohorts/:cohortId", (req, res, next) => {
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

  Cohort.findByIdAndUpdate(
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
      next(error);
    });
});

// 6. Deletes a specific cohorts by id
router.delete("/api/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  Cohort.findByIdAndDelete(cohortId)
    .then(() => res.status(204).json({ message: "Cohort was deleted!" }))
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
