# Bank Account Management Project

## Project Structure

Feature-based architecture using React and Redux Toolkit.

## Application Workflow

1. **Initialization**:
   - Application starts with `index.js` rendering the `App` component.
   - Redux store is initialized with account, customer, and transaction slices.
   - State is loaded from localStorage if available.

2. **Customer Registration**:
   - App conditionally renders the `CreateCustomer` component.
   - User enters name and ID, clicks "Create account".
   - `createCustomer` action is dispatched to Redux.
   - Customer state is updated and persisted.

3. **Banking Interface**:
   - Once a customer exists, App renders:
     - `Customer` (welcome message)
     - `AccountOperations` (transaction forms)
     - `BalanceDisplay` (current balance)
     - `TransactionHistory` (recent activity panel)

4. **Account Operations**:
   - **Deposit**: Add money (with optional currency conversion).
   - **Withdraw**: Remove money from balance.
   - **Request Loan**: Get a loan and add to balance.
   - **Pay Loan**: Deduct loan amount from balance and clear loan.

5. **Transaction History**:
   - Every deposit, withdrawal, loan, and loan payment is recorded.
   - All transactions are shown in the Recent Activity panel.

6. **Persistence**:
   - All Redux state (account, customer, transactions) is saved to localStorage.
   - Data survives page reloads.

## State Management

```js
{
  account: {
    balance: number,
    loan: number,
    loanPurpose: string,
    isLoading: boolean
  },
  customer: {
    fullName: string,
    nationalID: string,
    createdAt: string
  },
  transactions: {
    items: [
      {
        id: string,
        type: string,
        amount: number,
        currency: string,
        balanceAfter: number,
        meta: object,
        createdAt: string
      }
    ]
  }
}
```

## Key Features

- Modern Redux Toolkit usage (`createSlice`, thunks).
- Transaction history panel with all account activity.
- LocalStorage persistence for all state.
- Responsive, accessible UI with light/dark mode.
- Currency conversion for deposits.
- Loan management (request/pay).
- Clean code structure and comments.

## Getting Started

### `npm start`
Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it.

### `npm test`
Launches the test runner.

### `npm run build`
Builds the app for production.

