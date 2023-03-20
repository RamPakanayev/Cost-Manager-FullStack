// Import the express module and create a new router object
const express = require('express');
const router = express.Router();


// Define an array of categories for costs
const categories = [
  'food',
  'health',
  'housing',
  'sport',
  'education',
  'transportation',
  'other'
];

const isValidDate = (month,year) => {
  return month > 0 && month <= 12 &&year>=1900;
};

// Handle GET requests to the / report endpoint
router.get('/', async (req, res) => {

  // Logging message to track that the report route is being processed
  console.log("Processing report...");

  // Destructure the year, month, and user_id parameters from the query
  const { year, month, user_id } = req.query;

  // If any of the required parameters is missing, return an error
  if (!year || !month || !user_id) {
  return res.status(400).send({ error: "Invalid query parameters" });
  }

  // Check if the date is valid
  if(!isValidDate(month,year)){
    return res.status(400).send({error:"Invalid date. Year must be 1900 and above . Month must be between 1 to 12."})
  }


  try {
    // Find costs documents in the database based on user_id, year, and month
    const costs = await req.app.db.costDoc.find({
    user_id: user_id,
    year: year,
    month: month
  });
  // If no costs were found, return a message to the client
  if (!costs.length) {
    return res.send({ message: "No costs found for specified user_id and month/year" });
  }
  console.log("processing report");
  
  // Create a report object by grouping the costs by category
  const report = categories.reduce((result, category) => {
    result[category] = costs
      .filter(cost => cost.category === category)
      .map(cost => ({
        day: cost.day,
        description: cost.description,
        sum: cost.sum
      }));
    return result;
  }, {});

  // Send the report object as the response
  res.send(report);
  } 

  catch (err) {
    // If there is an error while fetching the costs, return an error
    return res.status(500).send({ error: 'Error while fetching costs' });
  }
  });
    
  // Export the router as a module
  module.exports = router;
