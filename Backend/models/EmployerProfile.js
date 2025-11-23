const mongoose = require("mongoose");

const EmployerProfileSchema = new mongoose.Schema({
  employerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  companyName: String,
  hrName: String,
  hrEmail: String,
  phone: String,
  industry: String,
  companySize: String,
  address: String,
  logoUrl: String, // saved filename
});

module.exports = mongoose.model("EmployerProfile", EmployerProfileSchema);
