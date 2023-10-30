import "./css/index.css"; // I put my css file in a specific folder before I saw that Stephen did not. I chose to keep it there.
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Import Provider, which will be used to display the context.
import { Provider } from "./context/books";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

// Wrap the component App in the parent Provider to give all components access to the data within the value prop (which is equal to the object valueToShare in books.js).
root.render(
    <Provider>
        <App />
    </Provider>
);