const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/signup", async (req, res) => {
    try {
      const { name, email, password, userType } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({ success: false, message: "Email already registered" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        userType 
      });
  
      await newUser.save();
  
      res.json({ success: true, message: "Registered Successfully" });
  
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Server error" });
    }
  });
  

  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({ success: false, message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({ success: false, message: "Incorrect password" });
      }
  
      res.json({
        success: true,
        message: "Logged in",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          userType: user.userType   // ⭐ important
        }
      });
  
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Server error" });
    }
  });
  

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: "Logged out" });
});

module.exports = router;
