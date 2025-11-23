const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../cloudinary");

// Use ONLY StudentProfile model
const StudentProfile = require("../models/StudentProfile");

// Multer memory storage
const upload = multer({ storage: multer.memoryStorage() });

/* ------------------------------------------
   SAVE STUDENT PROFILE (TEXT DATA)
---------------------------------------------*/
router.post("/save", async (req, res) => {
  try {
    const profile = await StudentProfile.findOneAndUpdate(
      { studentId: req.body.studentId },
      req.body,
      { upsert: true, new: true }
    );

    res.json({ success: true, message: "Profile saved", profile });
  } catch (err) {
    console.error("Save Error:", err);
    res.status(500).json({ success: false, message: "Error saving profile" });
  }
});

/* ------------------------------------------
   UPLOAD RESUME → CLOUDINARY
---------------------------------------------*/
router.post("/uploadResume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ success: false, message: "No file uploaded" });

    const fileBase64 = req.file.buffer.toString("base64");

    const uploadResult = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${fileBase64}`,
      {
        folder: "student_resumes",
        resource_type: "raw",
      }
    );

    await StudentProfile.findOneAndUpdate(
      { studentId: req.body.studentId },
      { resumeUrl: uploadResult.secure_url },
      { upsert: true }
    );

    res.json({
      success: true,
      message: "Resume uploaded successfully!",
      resumeUrl: uploadResult.secure_url,
    });

  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

/* ------------------------------------------
   GET ONE STUDENT PROFILE
---------------------------------------------*/
router.get("/profile/:studentId", async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({
      studentId: req.params.studentId,
    });

    res.json({ success: true, profile });
  } catch (err) {
    console.error("Fetch Profile Error:", err);
    res.status(500).json({ success: false, message: "Error fetching profile" });
  }
});

/* ------------------------------------------
   GET ALL STUDENTS (USED BY STUDENT MANAGEMENT UI)
---------------------------------------------*/
router.get("/all", async (req, res) => {
  try {
    const profiles = await StudentProfile.find(); // <-- ONLY THIS MODEL

    res.json({
      success: true,
      students: profiles,
    });
  } catch (err) {
    console.error("Fetch All Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching students.",
    });
  }
});

module.exports = router;
