import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App"; // Main application component
import { Provider } from "react-redux"; // Redux integration for React
import store from "./store"; // Configured Redux store with account and customer reducers

/**
 * Application Entry Point
 *
 * This file:
 * 1. Creates the React root element
 * 2. Wraps the entire application in Redux Provider to make store accessible
 * 3. Renders the main App component
 *
 * Key components:
 * - Provider: Makes Redux store available to all components via useSelector/useDispatch
 * - StrictMode: Development tool that highlights potential problems
 *
 * Redux store organization:
 * - Configured in store.js using Redux Toolkit's configureStore
 * - Contains two slices:
 *   1. account: Manages balance, loans, and transaction states
 *   2. customer: Manages customer information (name, ID, creation time)
 *
 * Application flow starts here and continues in App.js which conditionally
 * renders either customer creation form or banking interface components
 */

// Create a React root using the DOM element with id "root" from index.html
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application wrapped in StrictMode and Redux Provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
