const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userDoc } = require("../db/db");


// Signup route
router.post("/", async (req, res) => {
  const { email, password, firstName, lastName, birthday, id } = req.body;


  // Check if the email and password are provided
    // Check if the required fields are provided
    if (!email || !password || !firstName || !lastName || !birthday || !id) {
      return res.status(400).send({ error: "All fields are required" });
    }
  // Check for duplicate users
  const userExists = await userDoc.findOne({ email });
  if (userExists) {
    return res.status(400).send({ error: "Email already in use" });
  }


  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const newUser = new userDoc({
    _id: id,
    email,
    password: hashedPassword,
    first_name: firstName,
    last_name: lastName,
    birthday
  });

  try {
    // Save the user to the database
    await newUser.save();
    res.send({ message: "User created successfully" });
  } catch (error) {
    console.error("Error:", error); // Add this line to log the error to the console
    res.status(500).send({ error: "Error creating user" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if the email and password are provided
  if (!email || !password) {
    return res.status(400).send({ error: "Email and password are required" });
  }

  // Find the user in the database
  const user = await userDoc.findOne({ email });
  if (!user) {
    return res.status(400).send({ error: "Invalid email or password" });
  }

  // Compare the password with the stored hash
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send({ error: "Invalid email or password" });
  }

  // Generate a JWT token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || "your_jwt_secret", {
    expiresIn: "1h",
  });

  res.send({ message: "Logged in successfully", token , user_id: user._id});
});

// Middleware for protected routes
const authenticate = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({ error: "Invalid token" });
  }
};

module.exports = { router, authenticate };