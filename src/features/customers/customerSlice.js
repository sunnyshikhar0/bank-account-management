import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state for the customer slice of the Redux store
 * - fullName: Customer's full name (empty if no customer is created)
 * - nationalID: Customer's national ID (empty if no customer is created)
 * - createdAt: Timestamp when customer was created (used for auditing)
 */
const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

/**
 * Redux Toolkit slice for customer management
 * Handles customer creation and updates using Immer under the hood
 */
const customerSlice = createSlice({
  name: "customer", // Used as prefix for action types (customer/createCustomer, etc.)
  initialState,
  reducers: {
    /**
     * Creates a new customer with the provided information
     * Uses separate prepare and reducer functions:
     * - prepare: Formats payload and adds timestamp
     * - reducer: Updates state with customer information
     */
    createCustomer: {
      // Prepares the action payload with additional timestamp data
      prepare(fullName, nationalID) {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        };
      },
      // The actual reducer logic to update state
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },

    /**
     * Updates an existing customer's name
     * Note: This action is defined in the slice but not currently used in the application
     */
    updateCustomer(state, action) {
      state.fullName = action.payload;
    },
  },
});

// Export action creators for use in components
export const { createCustomer, updateCustomer } = customerSlice.actions;

// Export the reducer for use in store configuration
export default customerSlice.reducer;

/*
 * Below is the legacy implementation using plain Redux (without Redux Toolkit)
 * Kept for reference to show how createSlice simplifies the code
 * The commented code shows:
 * 1. Traditional switch-case reducer pattern
 * 2. Manual action creator functions
 * 3. More verbose state updates with object spread
 */

/* export default function customerReducer(state = initialStateCustomer, action) {
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

export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

export function updateCustomer(fullName) {
  return { type: "customer/updateCustomer", payload: fullName };
}

*/
