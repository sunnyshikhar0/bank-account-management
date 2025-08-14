import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import transactionsReducer from "./features/accounts/transactionSlice";

/**
 * Redux store configuration using Redux Toolkit
 *
 * This central store:
 * - Combines multiple slice reducers into a single state tree
 * - Automatically sets up Redux DevTools integration
 * - Configures middleware (including thunk for async operations)
 * - Creates the state structure that components access via useSelector
 *
 * State structure:
 * {
 *   account: {
 *     balance: number,
 *     loan: number,
 *     loanPurpose: string,
 *     isLoading: boolean
 *   },
 *   customer: {
 *     fullName: string,
 *     nationalID: string,
 *     createdAt: string
 *   }
 * }
 *
 * On app start: Redux loads state from localStorage (if available).
 * On any change: Redux saves the entire state tree to localStorage.
 * What’s persisted: All slices—account, customer, transactions.
 * No extra dependencies: Uses built-in browser APIs.

 * Key relationships:
 * - Used by index.js to provide state to the entire application
 * - account state accessed by AccountOperations.js and BalanceDisplay.js
 * - customer state accessed by App.js, Customer.js, and CreateCustomer.js
 * - Enables the currency conversion thunk in accountSlice.js
 */

// Utility: Load state from localStorage (if present)
function loadState() {
  try {
    const serialized = localStorage.getItem("bankAppState");
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch {
    return undefined;
  }
}

// Utility: Save state to localStorage
function saveState(state) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem("bankAppState", serialized);
  } catch {
    // Ignore write errors
  }
}

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
    transactions: transactionsReducer,
  },
  preloadedState: loadState(),
});

// Subscribe to store changes and persist to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
