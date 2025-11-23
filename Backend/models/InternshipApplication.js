const mongoose = require("mongoose");

const InternshipApplicationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  internshipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Internship",
    required: true,
  },

  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },

  advisorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // advisor user
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  appliedAt: {
    type: Date,
    default: Date.now,
  },

  studentMessage: String,
  advisorMessage: String,
});

module.exports = mongoose.model(
  "InternshipApplication",
  InternshipApplicationSchema
);
