const express = require("express");
const router = express.Router();
const InternshipApplication = require("../models/InternshipApplication");
const auth = require("../middleware/auth");

router.post("/apply", auth, async (req, res) => {
  try {
    const { internshipId, companyId, studentMessage } = req.body;

    const student = req.user;

    // if student has no advisor assigned, default null
    const advisorId = student.assignedAdvisor || null;

    const application = await InternshipApplication.create({
      studentId: student._id,
      internshipId,
      companyId,
      advisorId,
      studentMessage,
    });

    res.json({ success: true, application });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error submitting application" });
  }
});

module.exports = router;
