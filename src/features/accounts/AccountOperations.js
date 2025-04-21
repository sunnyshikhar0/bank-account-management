import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import Redux actions from accountSlice that will be dispatched
import { deposit, payLoan, requestLoan, withdraw } from "./accountSlice";

/**
 * Component that handles all banking operations:
 * - Depositing money (with currency conversion)
 * - Withdrawing money
 * - Requesting loans
 * - Paying back loans
 */
function AccountOperations() {
  // State for form inputs
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("INR"); // Default currency is INR

  // Get the dispatch function to send actions to Redux store
  const dispatch = useDispatch();

  // Extract relevant account state from Redux using destructuring and aliasing
  const {
    loan: currentLoan,
    loanPurpose: currentLoanPurpose,
    isLoading, // Used to show loading state during currency conversion
  } = useSelector((store) => store.account);

  /**
   * Handles the deposit operation
   * - Validates input
   * - Dispatches deposit action (handles currency conversion if needed)
   * - Resets form state
   */
  function handleDeposit() {
    if (!depositAmount) return;

    // deposit action in accountSlice handles currency conversion if needed
    dispatch(deposit(depositAmount, currency));
    setDepositAmount("");
    setCurrency("INR");
  }

  /**
   * Handles withdrawal operation
   * - Validates input
   * - Dispatches withdraw action
   * - Resets form state
   */
  function handleWithdrawal() {
    if (!withdrawalAmount) return;

    dispatch(withdraw(withdrawalAmount));
    setWithdrawalAmount("");
  }

  /**
   * Handles loan requests
   * - Validates both amount and purpose inputs
   * - Dispatches requestLoan action
   * - Resets form state
   */
  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;

    dispatch(requestLoan(loanAmount, loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
  }

  /**
   * Handles loan repayment
   * - Dispatches payLoan action which will:
   *   - Subtract loan amount from balance
   *   - Reset loan and loanPurpose state
   */
  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        {/* Deposit section with currency conversion */}
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)} // Convert string to number with +
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="INR">Indian Ruppee</option>
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          {/* Button text changes based on loading state during currency conversion */}
          <button onClick={handleDeposit}>
            {isLoading ? "Converting..." : `Deposit ${depositAmount}`}
          </button>
        </div>

        {/* Withdrawal section */}
        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        {/* Loan request section */}
        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {/* Loan repayment section - only shown if there is an active loan */}
        {currentLoan > 0 && (
          <div>
            <span>
              Pay back ₹{currentLoan} ({currentLoanPurpose})
            </span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
