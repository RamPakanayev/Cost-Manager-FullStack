import React, { useState } from "react";
import "./Report.css";
function Report({ reportData }) {
  const nonEmptyCategories = Object.entries(reportData)
    .filter(
      ([, categoryData]) =>
        Array.isArray(categoryData) && categoryData.length > 0
    )
    .map(([category, categoryData]) => ({ category, categoryData }));

  const sortedCategories = nonEmptyCategories.map(
    ({ category, categoryData }) => ({
      category,
      categoryData: categoryData.sort(
        (a, b) =>
          new Date(a.year, a.month - 1, a.day) -
          new Date(b.year, b.month - 1, b.day)
      ),
    })
  );

  const [categories, setCategories] = useState(sortedCategories);

  const totalSum = () => {
    let sum = 0;
    Object.values(reportData).forEach((category) => {
      if (Array.isArray(category)) {
        category.forEach((item) => {
          sum += Number(item.sum);
        });
      }
    });
    return new Intl.NumberFormat("en-US").format(sum);
  };

  async function handleDelete(costId) {
    // Call your API to delete the cost using the cost ID
    try {
      const response = await fetch(
        `http://localhost:1300/deletecost/${costId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Update the local state to remove the deleted cost
        const updatedCategories = categories
          .map(({ category, categoryData }) => ({
            category,
            categoryData: categoryData.filter((item) => item.id !== costId),
          }))
          .filter(({ categoryData }) => categoryData.length > 0);

        setCategories(updatedCategories);
      } else {
        console.error(
          "Failed to delete the cost. Status:",
          response.status,
          "Status Text:",
          response.statusText
        );
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  }

  return (
    <>
      <div>
        {categories.map(({ category, categoryData }) => (
          <React.Fragment key={category}>
            <h3>{category}</h3>
            <div className="reports">
              {categoryData.map((item, index) => {
                const time = item.id.substring(8, 14);
                return (
                  <div key={index} className="report">
                    <div className="ReportNumber">
                      <p className="pCenter">{index + 1}</p>
                    </div>
                    <p className="bold">
                      Sum: {Intl.NumberFormat("en-US").format(item.sum)} $
                    </p>
                    <p>Description: {item.description}</p>
                    <p>
                      Date:{" "}
                      {item.year && item.month && item.day
                        ? new Date(
                            item.year,
                            item.month - 1,
                            item.day,
                            time.substr(0, 2),
                            time.substr(2, 2),
                            time.substr(4, 2)
                          ).toLocaleString("en-GB", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })
                        : "Invalid Date"}
                    </p>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        ))}
        {nonEmptyCategories.length === 0 && (
          <div className="no-data-found">No Report data Found.</div>
        )}
        <div className="total-sum">Total Sum: {totalSum()} $</div>
      </div>
    </>
  );
}

export default Report;
