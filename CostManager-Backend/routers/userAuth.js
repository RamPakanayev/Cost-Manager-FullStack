const express = require("express");
const router = express.Router();
const { userDoc } = require("../db/db");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required.");
  }

  const userExists = await userDoc.findOne({ username });

  if (userExists) {
    return res.status(400).send("Username already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new userDoc({
    username,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.send("User registered successfully.");
  } catch (err) {
    res.status(500).send("Error while registering user.");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required.");
  }

  const user = await userDoc.findOne({ username });

  if (!user) {
    return res.status(400).send("Invalid username or password.");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(400).send("Invalid username or password.");
  }

  res.send("User logged in successfully.");
});

module.exports = router;
