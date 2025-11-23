const mongoose = require("mongoose");

const StudentProfileSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  fullName: String,
  email: String,
  phone: String,
  department: String,
  year: String,
  gpa: String,
  skills: [String],
  resumeUrl: String,   
});

module.exports = mongoose.model("StudentProfile", StudentProfileSchema);
