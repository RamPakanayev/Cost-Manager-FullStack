import React, { useState } from "react";

// A functional component that receives a callback function 'handleAddCostItem' as a prop.
// It renders a form for adding new cost items and includes input fields for sum, category, and description.
// When the form is submitted, it validates the inputs and calls the 'handleAddCostItem' callback function with the form data.
function AddCostForm({ handleAddCostItem }) {
// State variables for sum, category, and description
const [sum, setSum] = useState("");
const [category, setCategory] = useState("");
const [description, setDescription] = useState("");
const [date, setDate] = useState(new Date());

// A callback function for validating the form inputs.
// It checks if the sum and description fields are not empty and displays an alert if they are.
function validateInputs() {
if (sum === "") {
window.alert("Please enter a sum");
return false;
}
if (description === "") {
window.alert("Please enter a description");
return false;
}
return true;
}

return (
<form>
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
/>
</label>
<br />
<label>
Category:
<select value={category} onChange={(e) => setCategory(e.target.value)}>
<option value="">Select a category</option>
<option value="groceries">Groceries</option>
<option value="entertainment">Entertainment</option>
<option value="transportation">Transportation</option>
<option value="housing">Housing</option>
<option value="personal_care">Personal Care</option>
<option value="other">Other</option>
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
handleAddCostItem(sum, category, description,date);
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