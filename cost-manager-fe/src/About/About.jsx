import React, { useState, useEffect } from "react";
import "./About.css";
import gitHubLogo from './logos/github_logo.png'; // Import GitHub logo
import linkedInLogo from './logos/linkedin_logo.png'; // Import LinkedIn logo
import emailLogo from './logos/email_logo.png'; // Import Email logo

function About() {
  const [developers, setDevelopers] = useState([]);
   const width=100;
   const height=24;
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
    <div className="about">
      <h2>About the Developer:</h2>
      <hr />

      <table className="developer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>GitHub</th>
            <th>Project GitHub Url</th>
            <th>LinkedIn</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {developers.map((developer) => (
            <tr key={developer.id}>
              <td>{developer.firstName} {developer.lastName}</td>
              <td>
                <a href={developer.gitHubUrl} target="_blank" rel="noopener noreferrer">
                  <img src={gitHubLogo} alt="GitHub" width={width} height={height} />
                </a>
              </td>
              <td>
                <a href={developer.projectUrl} target="_blank" rel="noopener noreferrer">
                  <img src={gitHubLogo} alt="Project GitHub Url" width={width} height={height} />
                </a>
              </td>
              <td>
                <a href={developer.LinkedinUrl} target="_blank" rel="noopener noreferrer">
                  <img src={linkedInLogo} alt="LinkedIn" width={width} height={height} />
                </a>
              </td>
              <td>
                <a href={`mailto:${developer.email}`} target="_blank" rel="noopener noreferrer">
                  <img src={emailLogo} alt="Email" width={width} height={height} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default About;
