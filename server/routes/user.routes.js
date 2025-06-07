const express = require("express");

// Import model
const User = require("../models/User");
const router = express.Router();

// GET /api/users/:id
router.get("/api/users/:id", (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((foundedUser) => {
      console.log(`The user with id ${id} was founded!`);
      res.status(200).json(foundedUser);
    })
    .catch((error) => next(error));
});

module.exports = router;
