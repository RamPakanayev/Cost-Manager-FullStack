const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userDoc, costDoc } = require("../db/db");

// Middleware for protected routes
const authenticate = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({ error: "Invalid token" });
  }
};

// Signup route
router.post("/", async (req, res) => {
  const { email, password, firstName, lastName, birthday } = req.body;

  // Check if the email and password are provided
  // Check if the required fields are provided
  if (!email || !password || !firstName || !lastName || !birthday) {
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
    email,
    password: hashedPassword,
    first_name: firstName,
    last_name: lastName,
    birthday,
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
    return res.status(400).send({ error: "Invalid email" });
  }

  // Compare the password with the stored hash
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send({ error: "Invalid password" });
  }

  // Generate a JWT token
  const token = jwt.sign(
    { _id: user._id },
    process.env.JWT_SECRET || "your_jwt_secret",
    {
      expiresIn: "1h",
    }
  );

  res.send({ message: "Logged in successfully", token, user_id: user._id });
});

router.get("/profile", authenticate, async (req, res) => {
  const user = await userDoc.findById(req.user._id).select("-password");
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }
  res.send(user);
});

// Route to delete user and their associated cost data
router.delete("/deleteAccount/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`Deleting account for user ID: ${userId}`);

    // Delete user's cost data
    console.log("Deleting cost data...");
    await costDoc.deleteMany({ user_id: userId });
    console.log("Cost data deleted.");

    // Delete user account
    console.log("Deleting user account...");
    await userDoc.findByIdAndDelete(userId);
    console.log("User account deleted.");

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ error: "Error deleting user account and associated cost data" });
  }
});

module.exports = { router, authenticate };
