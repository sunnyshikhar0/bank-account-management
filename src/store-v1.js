import { combineReducers, createStore } from "redux";

/**
 * Initial state for the account slice
 * - balance: Current account balance
 * - loan: Amount of active loan (0 if no loan)
 * - loanPurpose: Purpose of the active loan (empty if no loan)
 *
 * Note: This version doesn't include isLoading for async operations, which was added later
 */
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

/**
 * Initial state for the customer slice
 * - fullName: Customer's full name (empty if no customer is created)
 * - nationalID: Customer's national ID (empty if no customer is created)
 * - createdAt: Timestamp when customer was created
 */
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

/**
 * Reducer for account-related actions using vanilla Redux pattern
 *
 * Handles:
 * - Deposits: Increase balance
 * - Withdrawals: Decrease balance
 * - Loan requests: Add loan and increase balance
 * - Loan repayment: Reset loan and decrease balance
 *
 * Note: Unlike the Redux Toolkit version, this uses manual immutable updates
 * with object spread syntax ({ ...state }) rather than Immer's direct mutations
 */
function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

/**
 * Reducer for customer-related actions using vanilla Redux pattern
 *
 * Handles:
 * - Customer creation: Set all customer fields
 * - Customer name updates: Update only the fullName field
 */
function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateCustomer":
      return {
        ...state,
        fullName: action.payload,
      };

    default:
      return state;
  }
}

/**
 * Combine individual reducers into a unified root reducer
 * Creates the nested state structure: { account: {...}, customer: {...} }
 */
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

/**
 * Create the Redux store with the combined reducer
 *
 * Limitations of this version:
 * - No middleware configuration (no async support via thunk)
 * - No DevTools integration
 * - No automatic action creator generation
 *
 * Later versions (store-v2.js and store.js) address these limitations
 */
const store = createStore(rootReducer);

// Test code (commented out)
// store.dispatch({ type: "account/deposit", payload: 501 });
// console.log(store.getState());

/**
 * Action creators for account operations
 *
 * These functions encapsulate action creation but must be
 * manually written (unlike in Redux Toolkit's createSlice)
 */
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

function payLoan() {
  return { type: "account/payLoan" };
}

/**
 * Action creators for customer operations
 */
function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateCustomer(fullName) {
  return { type: "customer/updateCustomer", payload: fullName };
}

// Test dispatch to verify store functionality
store.dispatch(deposit(251));
store.dispatch(createCustomer("Sunny Shikhar", "433757926999"));
console.log(store.getState());
