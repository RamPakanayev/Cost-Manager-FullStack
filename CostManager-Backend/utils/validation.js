const { costDoc,userDoc } = require("../db/db");
// Function to check if a given user_id exists in the users collection
const isValidUserId = async (userId) => {
  const user = await userDoc.findOne({ _id: userId });
  return user !== null;
};

// Function to check if a given day and month are valid
const isValidDate = (day = 1, month, year = 1900) => {
  return day > 0 && day <= 31 && month > 0 && month <= 12 && year >= 1900;
};

const idGenerator=()=>{
  let date=new Date()
  return (date.getFullYear().toString() +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    date.getDate().toString().padStart(2, "0") +
    date
      .getHours()
      .toString()
      .padStart(2, "0") +
    date
      .getMinutes()
      .toString()
      .padStart(2, "0") +
    date.getSeconds().toString().padStart(2, "0"));
}

// Function to check if a given category is one of the valid categories
const isValidCategory = (category) => {
  const validCategories = [
    "food",
    "health",
    "housing",
    "sport",
    "education",
    "transportation",
    "other",
  ];
  return validCategories.includes(category);
};
module.exports={isValidUserId,isValidDate, idGenerator,isValidCategory}