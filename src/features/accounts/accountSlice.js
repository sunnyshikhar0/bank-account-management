import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state for the account slice of the Redux store
 * - balance: Current account balance
 * - loan: Amount of active loan (0 if no loan)
 * - loanPurpose: Purpose of the active loan (empty if no loan)
 * - isLoading: Loading state during async operations like currency conversion
 */
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

/**
 * Redux Toolkit slice for account management
 * Handles all banking operations using immer under the hood for immutable updates
 */
const accountSlice = createSlice({
  name: "account", // Used as prefix for action types (account/deposit, account/withdraw, etc.)
  initialState,
  reducers: {
    /**
     * Updates balance after successful deposit
     * Also resets loading state after currency conversion
     */
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },

    /**
     * Reduces balance by withdrawal amount
     * No validation here - UI should handle validation to prevent negative balance
     */
    withdraw(state, action) {
      state.balance -= action.payload;
    },

    /**
     * Handles loan requests with separate prepare and reducer functions
     * - prepare: Formats the payload with amount and purpose
     * - reducer: Updates state with loan details and adds loan to balance
     */
    requestLoan: {
      // Prepares action payload from the function arguments
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      // The actual reducer logic
      reducer(state, action) {
        // Prevent multiple loans - users can only have one active loan at a time
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },

    /**
     * Handles loan repayment:
     * - Deducts loan amount from balance
     * - Resets loan state (amount and purpose)
     */
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },

    /**
     * Sets loading state during async currency conversion
     * Used by the deposit thunk to show loading UI
     */
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

// Export regular action creators from the slice
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

/**
 * Custom action creator for deposit that handles currency conversion
 * - For INR: Creates a simple action
 * - For other currencies: Returns a thunk that performs API-based conversion
 *
 * This is why deposit isn't exported directly from accountSlice.actions
 *
 * @param {number} amount - Amount to deposit
 * @param {string} currency - Currency code (INR, USD, EUR, GBP)
 * @returns {Object|Function} Either a standard action or a thunk function
 */
export function deposit(amount, currency) {
  // For INR, no conversion needed - return simple action
  if (currency === "INR") return { type: "account/deposit", payload: amount };

  // For other currencies, return a thunk function for async conversion
  return async function (dispatch, getState) {
    // Set loading state while waiting for conversion
    dispatch({ type: "account/convertingCurrency" });

    // Call frankfurter.app API to convert the currency to INR
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&symbols=INR`,
    );
    const data = await res.json();
    const converted = data.rates.INR;

    // Dispatch the deposit action with the converted amount
    dispatch({ type: "account/deposit", payload: converted });
  };
}

// Export the reducer as default for use in the store configuration
export default accountSlice.reducer;
