/*This file is used for client-side rendering of the React application using ReactDOM.
It imports the necessary libraries and components, and renders them to the 'root' element in the HTML file.*/
import React from "react"; 
import ReactDOM from "react-dom/client"; 
import { BrowserRouter } from 'react-router-dom';
import App from "./components/App"; 

const root = ReactDOM.createRoot(document.getElementById("root")); 
root.render( 
<React.StrictMode>
<App />
</React.StrictMode>
);

