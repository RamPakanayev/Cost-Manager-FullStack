const express = require("express");
const router = express.Router();
const { costDoc } = require("../db/db");

router.delete("/:id", async (req, res) => {
  // Get the cost ID from the request parameters
  const costId = req.params.id;

  // Check if the ID is provided
  if (!costId) {
    return res.status(400).send({ error: "Cost ID is required" });
  }

  try {
    // Find and delete the cost with the given ID
    const result = await costDoc.deleteOne({ id: costId });

    // If the cost was not found, return an error
    if (result.deletedCount === 0) {
      return res.status(404).send({ error: "Cost not found" });
    }

    // Return a success message
    res.send({ message: "Cost deleted successfully" });
  } catch (err) {
    // If there is an error while deleting the cost, return an error
    return res.status(500).send({ error: "Error while deleting the cost" });
  }
});

module.exports = router;
