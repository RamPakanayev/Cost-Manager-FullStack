import React, { useState, useEffect } from "react";
import AddCostForm from "./AddCostForm";
import ReportsForm from "./ReportsForm";

function HomePage() {
  return (
    <div className="HomePage">
      <AddCostForm />
      <ReportsForm />
    </div>
  );
}

export default HomePage;
