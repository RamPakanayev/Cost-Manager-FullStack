import React, { useState } from "react";

// A functional component that receives a callback function 'handleAddCostItem' as a prop.
// It renders a form for adding new cost items and includes input fields for sum, category, and description.
// When the form is submitted, it validates the inputs and calls the 'handleAddCostItem' callback function with the form data.
function AddCostForm({ userId }) {
  // State variables for sum, category, and description
  const [sum, setSum] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  // const [userId, setUserId] = useState("123123"); // set the default userId to "123123"

  // A callback function for validating the form inputs.
  // It checks if the sum and description fields are not empty and displays an alert if they are.
  function validateInputs() {
    if (sum === 0) {
      window.alert("Please enter a sum");
      return false;
    }
    if (description === "") {
      window.alert("Please enter a description");
      return false;
    }
    if (category === "") {
      setCategory("Other");
    }
    return true;
  }
  

  // A callback function to add the new cost item using fetch API
  function handleAddCostItem(e) {
    e.preventDefault(); // prevent the default form submission behavior
  
    // validate the inputs and update the category if necessary
    if (!validateInputs()) {
      return;
    }
  
    // use the updated category value
    const updatedCategory = category === "" ? "Other" : category;
  
    // create the cost item object
    const costItem = {
      user_id: userId,
      sum: sum,
      category: updatedCategory,
      description: description,
      year: Number(date.getFullYear()),
      month: Number(date.getMonth() + 1),
      day: Number(date.getDate()),
    };
  
    // send a POST request to the backend to add the new cost item
    fetch("/addCost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(costItem),
    })
      .then((res) => {
        if (res.ok) {
          // clear the input fields
          setSum(0);
          setCategory("");
          setDescription("");
          setDate(new Date());
          window.alert("Cost item was successfully added");
        } else {
          throw new Error("Failed to add cost item");
        }
      })
      .catch((err) => {
        console.error(err);
        window.alert("Failed to add cost item");
      });
  }

  return (
    <form>
      <h2>Add new cost item</h2>
      <hr />

      <label>
        User ID:
        <input
          type="text"
          value={userId}
          disabled
        />
      </label>

      <br />

      <label>
        Sum:
        <input
          type="number"
          value={sum}
          onChange={(e) => setSum(e.target.value)}
          placeholder="Enter a sum"
          min="0"
        />
      </label>
      <br />

      <label>
        Category:
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          <option value="Food">Food</option>
          <option value="Health">Health</option>
          <option value="Transportation">Transportation</option>
          <option value="Housing">Housing</option>
          <option value="Sport">Sport</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>

      </label>
     
      <br />
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a description"
        />
      </label>
      <br />
      <label>
        Date:
        <input
          type="date"
          value={date.toISOString().substr(0, 10)}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
      </label>
      <br />
      <button
        onClick={(e) => {
          e.preventDefault();
          if (validateInputs()) {
            handleAddCostItem(e);
            setSum("");
            setCategory("");
            setDescription("");
            setDate(new Date());
          }
        }}
      >
        Add Cost Item
      </button>
    </form>
  );
}

export default AddCostForm;
