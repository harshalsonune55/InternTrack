const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../cloudinary");

// Models
const AdvisorProfile = require("../models/AdvisorProfile");
const InternshipApplication = require("../models/InternshipApplication");

// Multer memory storage (same as student example)
const upload = multer({ storage: multer.memoryStorage() });

/* ------------------------------------------
   CREATE OR UPDATE ADVISOR PROFILE
---------------------------------------------*/
router.post("/profile", upload.single("profileImage"), async (req, res) => {
  try {
    const advisorId = req.body.advisorId;

    if (!advisorId)
      return res.json({ success: false, message: "advisorId missing" });

    let imageUrl;

    // If advisor uploaded a profile image → upload to Cloudinary
    if (req.file) {
      const fileBase64 = req.file.buffer.toString("base64");

      const uploadResult = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${fileBase64}`,
        {
          folder: "advisor_profiles",
          resource_type: "image",
        }
      );

      imageUrl = uploadResult.secure_url;
    }

    const updatedProfile = await AdvisorProfile.findOneAndUpdate(
      { advisorId },
      {
        advisorId,
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        department: req.body.department,
        designation: req.body.designation,
        officeLocation: req.body.officeLocation,
        profileImage: imageUrl,
      },
      { new: true, upsert: true }
    );

    res.json({ success: true, profile: updatedProfile });

  } catch (err) {
    console.error("Advisor Save Error:", err);
    res.json({ success: false, message: "Error saving profile" });
  }
});

/* ------------------------------------------
   GET ADVISOR PROFILE
---------------------------------------------*/
router.post("/getProfile", async (req, res) => {
  try {
    const advisorId = req.body.advisorId;

    if (!advisorId)
      return res.json({ success: false, message: "advisorId missing" });

    const profile = await AdvisorProfile.findOne({ advisorId });

    res.json({ success: true, profile });

  } catch (err) {
    console.error("Advisor Profile Load Error:", err);
    res.json({ success: false, message: "Error loading profile" });
  }
});

/* ------------------------------------------
   GET INTERNSHIP APPLICATIONS FOR THIS ADVISOR
---------------------------------------------*/
router.post("/applications", async (req, res) => {
  try {
    const advisorId = req.body.advisorId;

    if (!advisorId)
      return res.json({ success: false, message: "advisorId missing" });

    const apps = await InternshipApplication.find({ advisorId })
      .populate("studentId")
      .populate("companyId")
      .populate("internshipId");

    res.json({ success: true, applications: apps });

  } catch (err) {
    console.error("Advisor Applications Error:", err);
    res.json({ success: false, message: "Error loading applications" });
  }
});

/* ------------------------------------------
   APPROVE APPLICATION
---------------------------------------------*/
router.post("/applications/approve", async (req, res) => {
  try {
    const { applicationId, message } = req.body;

    const updated = await InternshipApplication.findByIdAndUpdate(
      applicationId,
      { status: "approved", advisorMessage: message },
      { new: true }
    );

    res.json({ success: true, application: updated });

  } catch (err) {
    console.error("Approve Error:", err);
    res.json({ success: false });
  }
});

/* ------------------------------------------
   REJECT APPLICATION
---------------------------------------------*/
router.post("/applications/reject", async (req, res) => {
  try {
    const { applicationId, message } = req.body;

    const updated = await InternshipApplication.findByIdAndUpdate(
      applicationId,
      { status: "rejected", advisorMessage: message },
      { new: true }
    );

    res.json({ success: true, application: updated });

  } catch (err) {
    console.error("Reject Error:", err);
    res.json({ success: false });
  }
});

module.exports = router;
