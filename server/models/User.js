const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
});

// Create Model
const User = mongoose.model("User", UserSchema);

// Export the Model
module.exports = User;
