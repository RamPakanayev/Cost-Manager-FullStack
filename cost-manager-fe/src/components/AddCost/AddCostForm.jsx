import React, { useState } from "react";
import "./AddCostForm.css";

function AddCostForm({ userId }) {
  const [sum, setSum] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [sumError, setSumError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  function validateInputs() {
    let isValid = true;
  
    if (sum === "" || sum < 0) {
      setSumError(true);
      setErrorMessage("Sum must be a number greater than 0.");
      isValid = false;
    } else {
      setSumError(false);
    }
  
    if (description.trim() === "") {
      setDescriptionError(true);
      if (sum === "" || sum < 0) {
        setErrorMessage("Sum and Description are required fields.");
      } else {
        setErrorMessage("Description cannot be empty.");
      }
      isValid = false;
    } else {
      setDescriptionError(false);
    }
  
    if (category === "") {
      setCategory("Other");
    }
  
    if (isValid) {
      setErrorMessage("");
    }
  
    return isValid;
  }
  

  function handleAddCostItem(e) {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const updatedCategory = category === "" ? "Other" : category;

    const costItem = {
      user_id: userId,
      sum: parseFloat(sum), // Make sure to parse the sum as a float
      category: updatedCategory,
      description: description,
      year: Number(date.getFullYear()),
      month: Number(date.getMonth() + 1),
      day: Number(date.getDate()),
    };

    fetch("/addCost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(costItem),
    })
      .then((res) => {
        if (res.ok) {
          setSum("");
          setCategory("");
          setDescription("");
          setDate(new Date());
        } else {
          throw new Error("Failed to add cost item");
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Failed to add cost item");
      });
  }
  return (
    <form className="cost-item-form" onSubmit={handleAddCostItem}>
      <h2>Add new cost item</h2>
      <hr />

      <label>
        Sum:
        <input
          type="number"
          value={sum}
          onChange={(e) => setSum(e.target.value)}
          placeholder="Enter a sum"
          min="0"
          required
          className={sumError ? "error" : ""}
        />
      </label>
      <br />

      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
          className={descriptionError ? "error" : ""}
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

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          if (validateInputs()) {
            handleAddCostItem(e);
            setSum("");
            setCategory("");
            setDescription("");
            setDate(new Date());
          } else {
            setTimeout(() => {
              setSumError(false);
              setDescriptionError(false);
            }, 500);
          }
        }}
      >
        Add Cost Item
      </button>
    </form>
  );
}

export default AddCostForm;
