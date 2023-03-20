const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const { costDoc,userDoc } = require("../db/db");
const url = require("url");
const {isValidUserId,isValidDate, idGenerator,isValidCategory}=require("../utils/validation")


router.post("/", async (req, res) => {
  // Logging message to track that the addCost route is being processed
  console.log("Processing new added cost...");

  // Destructuring the parameters into separate variables
  let userId = req.body.user_id;
  let year = req.body.year || new Date().getFullYear();
  let month = req.body.month || (new Date().getMonth() + 1);
  let day = req.body.day || new Date().getDate();
  let description = req.body.description;
  let category = req.body.category;
  let sum = req.body.sum;
  let id =idGenerator()

  
  // Check if the required fields (user_id, description, sum, category) are provided
  if (!userId || !description || !sum || !category) {
    return res.status(400)
    .send("user_id, description, sum, and category are required keys.");
  }

 // Check if the user_id exists in the users collection
 const userExists = await isValidUserId(userId);
 if (!userExists) {
   return res.status(400).send("Invalid user_id.");
 }

  // Check if the sum is a valid number
  if (isNaN(sum)) {
    return res.status(400).send("Invalid sum. Sum must be a number.");
  }

  // Check if the category is valid
  if (!isValidCategory(category)) {
    return res.status(400)
    .send("Invalid category. \n The options are: \n food, health, housing, sport,\n education, transportation and other.");
  }

  // Check if the date is valid
  if (!isValidDate(day, month, year)) {
    return res.status(400)
    .send("Invalid date.\n Day must be between 1 to 31 or an empty filed,\n Month must be between 1 to 12  or an empty filed,\n Year must be 1900 and above or an empty filed.\n \n # Note:\n An empty felid will be filled by the current date.");
  }

  // Creating a new cost document with the given parameters
  let cost = new costDoc({
    user_id: userId,
    year,
    month,
    day,
    id,
    description,
    category,
    sum,
  });

  // Trying to save the cost document to the database
  try {
    await cost.save();
    console.log("Cost was saved in the MongoDB dataBase");
  }catch (err) {
  // If there is an error while fetching the costs, return an error
  return res.status(500)
  .send({ error: 'Error accrued while trying to save the cost' });
}

  // Sending a response indicating that the cost was saved to the database
  res.send("Cost was successfully saved in the MongoDB dataBase! \n\n" + cost);
});

module.exports = router;
