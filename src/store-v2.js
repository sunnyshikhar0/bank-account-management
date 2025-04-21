import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

/**
 * Version 2 of the Redux store configuration
 * This version adds middleware support and developer tools integration
 *
 * Key improvements over store-v1.js:
 * - Adds thunk middleware for handling async operations (currency conversion)
 * - Integrates Redux DevTools for improved debugging experience
 *
 * Store structure remains the same:
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
 * This interim version shows the traditional Redux setup with middleware
 * before the final transition to Redux Toolkit in store.js
 */

/**
 * Combines reducers to create a unified state tree
 * Each reducer manages its own slice of the state
 */
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

/**
 * Creates the Redux store with:
 * - Combined reducers for state management
 * - Redux DevTools integration via composeWithDevTools
 * - Thunk middleware for async actions like currency conversion
 *
 * The thunk middleware is essential for the deposit action in accountSlice.js
 * which performs API-based currency conversion
 */
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
