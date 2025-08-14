import { createSlice, nanoid } from "@reduxjs/toolkit";

// Each transaction: {id, type, amount, currency, inrAmount, balanceAfter, meta, createdAt}
const initialState = {
  items: [],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    record(state, action) {
      state.items.unshift(action.payload); // Add newest first
    },
    clear(state) {
      state.items = [];
    },
  },
});

export const { record, clear } = transactionsSlice.actions;
export default transactionsSlice.reducer;

// Helper to build a transaction object
export function addTransaction({
  type,
  amount,
  currency = "INR",
  inrAmount,
  balanceAfter,
  meta,
}) {
  return record({
    id: nanoid(),
    type,
    amount,
    currency,
    inrAmount: inrAmount ?? amount,
    balanceAfter,
    meta,
    createdAt: new Date().toISOString(),
  });
}


/**
 * Transaction slice for recording all account activity
 * - Stores deposits, withdrawals, loan actions as transaction objects
 * - Used by TransactionHistory component to display recent activity
 * - Transactions are persisted via Redux store's localStorage integration
 */