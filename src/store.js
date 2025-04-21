import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

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
 * Key relationships:
 * - Used by index.js to provide state to the entire application
 * - account state accessed by AccountOperations.js and BalanceDisplay.js
 * - customer state accessed by App.js, Customer.js, and CreateCustomer.js
 * - Enables the currency conversion thunk in accountSlice.js
 */
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
