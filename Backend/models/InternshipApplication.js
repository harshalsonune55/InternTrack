const mongoose = require("mongoose");

const InternshipApplicationSchema = new mongoose.Schema({
  studentId: {
    type: String,   // ← changed from ObjectId
    required: true,
  },

  internshipId: {
    type: String,   
    required: true,
  },

  companyId: {
    type: String,   // ← changed from ObjectId
    required: true,
  },

  advisorId: {
    type: String,   // ← changed from ObjectId
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
