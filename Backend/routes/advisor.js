const express = require("express");
const router = express.Router();
const AdvisorProfile = require("../models/AdvisorProfile");
const InternshipApplication = require("../models/InternshipApplication"); // if you added it
const auth = require("../middleware/auth");
const upload = require("../middleware/upload"); // multer

// ⭐ CREATE or UPDATE ADVISOR PROFILE (Controller inside route)
router.post("/profile", auth, upload.single("profileImage"), async (req, res) => {
  try {
    const advisorId = req.user._id;

    const profileData = {
      advisorId,
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      department: req.body.department,
      designation: req.body.designation,
      officeLocation: req.body.officeLocation,
      profileImage: req.file ? req.file.filename : undefined,
    };

    const updatedProfile = await AdvisorProfile.findOneAndUpdate(
      { advisorId },
      profileData,
      { new: true, upsert: true }
    );

    return res.json({ success: true, profile: updatedProfile });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error saving profile" });
  }
});

// ⭐ GET ADVISOR PROFILE
router.get("/profile", auth, async (req, res) => {
  try {
    const profile = await AdvisorProfile.findOne({ advisorId: req.user._id });
    res.json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error loading profile" });
  }
});

// ⭐ GET INTERNSHIP APPLICATIONS FOR THIS ADVISOR
router.get("/applications", auth, async (req, res) => {
  try {
    const apps = await InternshipApplication.find({ advisorId: req.user._id })
      .populate("studentId")
      .populate("companyId")
      .populate("internshipId");

    res.json({ success: true, applications: apps });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error loading applications" });
  }
});

// ⭐ ADVISOR APPROVE APPLICATION
router.post("/applications/:id/approve", auth, async (req, res) => {
    try {
      const updated = await InternshipApplication.findByIdAndUpdate(
        req.params.id,
        { status: "approved", advisorMessage: req.body.message },
        { new: true }
      );
  
      res.json({ success: true, application: updated });
    } catch (err) {
      res.status(500).json({ success: false });
    }
  });
  
  // ⭐ ADVISOR REJECT APPLICATION
  router.post("/applications/:id/reject", auth, async (req, res) => {
    try {
      const updated = await InternshipApplication.findByIdAndUpdate(
        req.params.id,
        { status: "rejected", advisorMessage: req.body.message },
        { new: true }
      );
  
      res.json({ success: true, application: updated });
    } catch (err) {
      res.status(500).json({ success: false });
    }
  });
  

module.exports = router;
