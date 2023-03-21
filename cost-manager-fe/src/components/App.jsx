import React, { useState, useEffect } from "react";
import AddCostForm from "./AddCostForm";
import ReportsForm from "./ReportsForm";

// Main component that renders the AddCostForm and ReportsForm components
// It also handles the data manipulation and communication with the LocalStorageLibrary
function App() {
// State variables for the report data, and report display toggle
const [report, setReport] = useState([]);
const [showReport, setShowReport] = useState(false);
const [month, setMonth] = useState(0);
const [year, setYear] = useState(0);
const [imagePath, setImagePath] = useState("./Logo.png");

// useEffect hook that sets the imagePath state variable to the correct file path
useEffect(() => {
  setImagePath(process.env.PUBLIC_URL + "/Logo.png");
}, []); // this will make the effect to be called only once when the component is rendered


return (
  <div className="App">
    <img src={imagePath} alt="Logo" />
    <AddCostForm  />
    <ReportsForm
      month={month}
      setMonth={setMonth}
      year={year}
      setYear={setYear}
      showReport={showReport}
      report={report}
    />
  </div>
);
}

export default App;
