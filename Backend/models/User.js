const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // ⭐ NEW FIELD
  userType: {
    type: String,
    enum: ["student", "employer", "advisor"],
    default: "student",
  },
  assignedAdvisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  }
});

module.exports = mongoose.model("User", UserSchema);
