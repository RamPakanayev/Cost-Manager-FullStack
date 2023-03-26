import React, { useState, useEffect } from "react";
import AddCostForm from "./AddCostForm";
import ReportsForm from "./ReportsForm";

function HomePage({ userId }) {
  return (
    <div className="HomePage">
      <AddCostForm userId={userId}/>
      <ReportsForm userId={userId} />
    </div>
  );
}


export default HomePage;
