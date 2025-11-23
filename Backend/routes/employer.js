const express = require("express");
const router = express.Router();
const EmployerProfile = require("../models/EmployerProfile");

router.post("/save", async (req, res) => {
  try {
    const profile = await EmployerProfile.findOneAndUpdate(
      { employerId: req.body.employerId },
      req.body,
      { upsert: true, new: true }
    );

    res.json({ success: true, message: "Employer profile saved", profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error saving employer profile" });
  }
});

router.get("/:employerId", async (req, res) => {
    try {
      const profile = await EmployerProfile.findOne({ employerId: req.params.employerId });
      res.json({ success: true, profile });
    } catch (err) {
      res.status(500).json({ success: false, message: "Error fetching profile" });
    }
  });

module.exports = router;
