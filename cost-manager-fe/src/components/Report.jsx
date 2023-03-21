import React from "react";

function Report({ reportData }) {
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

  const nonEmptyCategories = Object.entries(reportData)
    .filter(([, categoryData]) => Array.isArray(categoryData) && categoryData.length > 0)
    .map(([category, categoryData]) => ({ category, categoryData }));

  const sortedCategories = nonEmptyCategories.map(({ category, categoryData }) => ({
    category,
    categoryData: categoryData.sort((a, b) => new Date(a.date) - new Date(b.date)),
  }));

  return (
    <>
      <div>
        {sortedCategories.map(({ category, categoryData }) => (
          <React.Fragment key={category}>
            <h3>{category}</h3>
            <div className="reports">
              {categoryData.map((item, index) => (
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
                    {new Date(item.date).toLocaleString("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </p>
                </div>
              ))}
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
