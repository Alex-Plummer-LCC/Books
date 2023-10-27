import "./css/index.css"; // I put my css file in a specific folder before I saw that Stephen did not. I chose to keep it there.
// Repeat the standard processes with a React app - import the necessary components, create a root and give it to React, then render the App.
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(<App />);