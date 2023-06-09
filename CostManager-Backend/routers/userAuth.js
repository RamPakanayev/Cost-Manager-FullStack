const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userDoc, costDoc } = require("../db/db");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

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
router.delete("/deleteAccount/:userId", authenticate, async (req, res) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;
    console.log(`Deleting account for user ID: ${userId}`);

    // Find the user in the database
    const user = await userDoc.findById(userId);
    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }

    // Compare the password with the stored hash
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ error: "Invalid password" });
    }

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

// Update user info route
router.put("/updateInfo/:userId", authenticate, async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName } = req.body;

  try {
    await userDoc.findByIdAndUpdate(userId, {
      first_name: firstName,
      last_name: lastName,
    }); // Update the field names here
    res.send({ message: "User info updated successfully" });
  } catch (error) {
    console.error("Error:", error); // Add this line to log the error to the console
    res.status(500).send({ error: "Error updating user info" });
  }
});

// Change password route
router.post("/changePassword/:userId", authenticate, async (req, res) => {
  const userId = req.params.userId;
  const { old_password, new_password } = req.body;

  // Get user by ID
  const user = await userDoc.findById(userId);
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  // Compare the old password with the stored hash
  const validPassword = await bcrypt.compare(old_password, user.password);
  if (!validPassword) {
    return res.status(400).send({ error: "Incorrect current password" });
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(new_password, salt);

  try {
    // Update the user password
    await userDoc.findByIdAndUpdate(userId, { password: hashedPassword });
    res.send({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Error changing password" });
  }
});

//forgetPassword route
router.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ error: "Email is required" });
  }

  const user = await userDoc.findOne({ email });
  if (!user) {
    return res.status(400).send({ error: "User not found" });
  }

  const generatePassword = ((
    length = 20,
    wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
  ) =>
    Array.from(crypto.getRandomValues(new Uint32Array(length)))
      .map((x) => wishlist[x % wishlist.length])
      .join(''))
  

  const newPassword =generatePassword(); //crypto.randomBytes(8).toString("hex");
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  try {
    await userDoc.updateOne({ email }, { password: hashedPassword });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your new password",
      text: `Hello,\n We've reset your password.\n Your new password is: ${newPassword} \n It is recommended to change the password under the settings on the website`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Error sending email" });
      } else {
        res.send({ message: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Error updating password" });
  }
});

module.exports = { router, authenticate };
