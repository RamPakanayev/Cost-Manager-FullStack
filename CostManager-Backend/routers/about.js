// This file sets up a route for the "About" page, which returns information about developers in the form of a JSON object.

const express = require("express");
const router = express.Router(); // Creates an instance of the Express router

// Defines the route "/" for the "About" page, which is a GET request.
router.get("/", (req, res) => {
// The data being returned is an array of developer objects with properties "firstName", "lastName", "id", and "email".
let developers = [
{
firstName: "Ram",
lastName: "Pakanayev",
id: "313561433",
email: "rampakanayev@gmail.com",
},
{
firstName: "Shachar",
lastName: "Baba",
id: "208613083",
email: "shaharbaba12@gmail.com",
},
];
// The response will be a JSON object containing the developers array.
res.json(developers);
});

// Exports the Express router for use in other parts of the application.
module.exports = router;