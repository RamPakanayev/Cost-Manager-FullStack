import React, { useState, useEffect } from "react";
// import "./About.css";

function About() {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await fetch("/about");
        if (!response.ok) {
          throw new Error("Error fetching developer data");
        }

        const data = await response.json();
        setDevelopers(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchDevelopers();
  }, []);

  return (
    <form className="about">
      <h2>About the Developer:</h2>
      <hr />

      <ul className="developer-list">
        {developers.map((developer) => (
          <li key={developer.id}>
            <p>Name: {developer.firstName} {developer.lastName}</p>
            <p>GitHub: {developer.gitHubUrl}</p>
            <p>Email: {developer.email}</p>
          </li>
        ))}
      </ul>
    </form>
  );
}

export default About;
