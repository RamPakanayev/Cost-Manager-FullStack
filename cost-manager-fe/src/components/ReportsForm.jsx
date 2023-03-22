import React, { useEffect, useState } from "react";
import Report from "./Report";

function ReportsForm() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [report, setReport] = useState([]);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    setMonth(String(currentDate.getMonth() + 1));
    setYear(String(currentDate.getFullYear()));
  }, []);

  const handleGetReport = async () => {
    try {
      const response = await fetch(`/report?year=${year}&month=${month}&user_id=123123`);
      const data = await response.json();
      console.log("Report data: ", data);
      setReport(data);
      setShowReport(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGetReport();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reports</h2>
      <hr />
      <label>
        Month:
        <input
          type="number"
          placeholder="MM"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          min="1"
          max="12"
        />
      </label>
      <br />
      <label>
        Year:
        <input
          type="number"
          placeholder="YYYY"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Show Report</button>
      {showReport && <Report reportData={report} />}
    </form>
  );
}

export default ReportsForm;
