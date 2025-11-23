require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");

const authRoutes = require("./routes/auth");
const employerRoutes = require("./routes/employer");
const studentRoutes = require("./routes/student");
const advisorRoutes = require("./routes/advisor");
const internshipRoutes = require("./routes/internships");

const app = express();

// CORS
app.use(
    cors({
      origin: "*",
      credentials: false, 
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type,Authorization",
    })
  );
  
  

app.use(express.json());

// SESSION
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// MONGO CONNECT
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Error:", err));

// ROUTES
app.use("/auth", authRoutes);
app.use("/api/employer", employerRoutes);
app.use("/api/student", studentRoutes);
app.use("/advisor", advisorRoutes);
app.use("/internships", internshipRoutes);

// START SERVER
app.listen(process.env.PORT, () =>
  console.log(`Server running at http://localhost:${process.env.PORT}`)
);
