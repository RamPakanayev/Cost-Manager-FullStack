import React, { useState, useEffect } from "react";
import AddCostForm from "./AddCostForm";
import ReportsForm from "./ReportsForm";

function App() {
  const [imagePath, setImagePath] = useState("./Logo.png");

  useEffect(() => {
    setImagePath(process.env.PUBLIC_URL + "/Logo.png");
  }, []);

  return (
    <div className="App">
      <img src={imagePath} alt="Logo" />
      <AddCostForm />
      <ReportsForm />
    </div>
  );
}

export default App;
