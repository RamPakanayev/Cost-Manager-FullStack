import React, { useEffect } from "react";
import Report from "./Report";

function ReportsForm({
  handleGetReport,
  showReport,
  report,
  month,
  year,
  setMonth,
  setYear,
}) {
  useEffect(() => {
    const currentDate = new Date();
    setMonth(String(currentDate.getMonth() + 1));
    setYear(String(currentDate.getFullYear()));
  }, [setMonth, setYear]);
   

  return (
    <form>
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
      <label>
        <br/>
        Year:
        <input
          type="number"
          placeholder="YYYY"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </label>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleGetReport(parseInt(month), parseInt(year));
        }}
      >
        Get Reports
      </button>
      {showReport && <Report reportData={report} />}
    </form>
  );
}

export default ReportsForm;
