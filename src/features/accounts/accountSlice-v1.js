/**
 * Initial state for the account slice using vanilla Redux approach
 * Serves as the starting point for the account-related data
 * - balance: Current monetary balance in the account
 * - loan: Current outstanding loan amount (0 means no active loan)
 * - loanPurpose: Description of what the loan is for (empty if no loan)
 *
 * Note: This version lacks the isLoading state that was added later for handling
 * async currency conversion UI feedback
 */
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

/**
 * Account reducer - traditional Redux implementation
 * Manages all account-related state changes based on dispatched actions
 *
 * Unlike the Redux Toolkit version (accountSlice.js), this uses:
 * - switch/case pattern for action handling
 * - manual state immutability with spread operators ({...state})
 * - no automatic action creator generation
 *
 * @param {Object} state - Current account state (defaults to initialStateAccount)
 * @param {Object} action - Redux action with type and payload
 * @returns {Object} New state after applying the action
 */
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      // Add deposit amount to balance
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      // Subtract withdrawal amount from balance
      // Note: No validation here to prevent negative balance
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      // Prevent multiple loans - only one active loan allowed at a time
      if (state.loan > 0) return state;

      // Create loan and add loan amount to balance
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      // Repay loan by subtracting amount from balance and resetting loan state
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      // Return unchanged state for unknown actions
      return state;
  }
}

/**
 * Deposit action creator with currency conversion support
 *
 * This function:
 * - Handles direct INR deposits with a simple action
 * - For other currencies, returns a thunk that performs conversion via API
 *
 * Note: This is more complex than other action creators because it conditionally
 * returns either an action object or a thunk function
 *
 * @param {number} amount - Amount to deposit
 * @param {string} currency - Currency code (INR, USD, EUR, GBP)
 * @returns {Object|Function} Either action object or thunk function
 */
export function deposit(amount, currency) {
  // For INR deposits, skip conversion and return simple action
  if (currency === "INR") return { type: "account/deposit", payload: amount };

  // For other currencies, return a thunk function for async conversion
  return async function (dispatch, getState) {
    // Note: This version doesn't dispatch a loading state action
    // The Redux Toolkit version adds dispatch({ type: "account/convertingCurrency" })

    // Call frankfurter.app API to convert currency to INR
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&symbols=INR`,
    );
    const data = await res.json();
    const converted = data.rates.INR;

    // Dispatch the deposit action with converted amount
    dispatch({ type: "account/deposit", payload: converted });
  };
}

/**
 * Creates a withdraw action
 * Used by the handleWithdrawal function in AccountOperations.js
 *
 * @param {number} amount - Amount to withdraw from account
 * @returns {Object} Action object
 */
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

/**
 * Creates a requestLoan action
 * Used by the handleRequestLoan function in AccountOperations.js
 *
 * @param {number} amount - Loan amount to request
 * @param {string} purpose - Purpose of the loan
 * @returns {Object} Action object with combined payload
 */
export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

/**
 * Creates a payLoan action
 * Used by the handlePayLoan function in AccountOperations.js
 *
 * @returns {Object} Action object (no payload needed)
 */
export function payLoan() {
  return { type: "account/payLoan" };
}
