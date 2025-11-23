const mongoose = require("mongoose");

const AdvisorProfileSchema = new mongoose.Schema({
  advisorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  fullName: String,
  email: String,
  phone: String,
  department: String,
  designation: String,
  officeLocation: String,
  profileImage: String,
});

module.exports = mongoose.model("AdvisorProfile", AdvisorProfileSchema);
