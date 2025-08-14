import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import Redux actions from accountSlice that will be dispatched
import { deposit, payLoan, requestLoan, withdraw } from "./accountSlice";
import {addTransaction} from "./transactionSlice";

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

  // Get the current account balance
  const balance = useSelector((store) => store.account.balance);
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
    // Add transaction record for deposit
    dispatch(
      addTransaction({
        type: "deposit",
        amount: depositAmount,
        currency,
        balanceAfter: balance + Number(depositAmount),
      }),
    );
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
    dispatch(
      addTransaction({
        type: "withdraw",
        amount: withdrawalAmount,
        currency: "INR",
        balanceAfter: balance - Number(withdrawalAmount),
      }),
    );
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
    dispatch(
      addTransaction({
        type: "loanGranted",
        amount: loanAmount,
        currency: "INR",
        meta: { purpose: loanPurpose },
        balanceAfter: balance + Number(loanAmount),
      }),
    );
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
    dispatch(
      addTransaction({
        type: "loanPaid",
        amount: currentLoan,
        currency: "INR",
        meta: { purpose: currentLoanPurpose },
        balanceAfter: balance - currentLoan,
      }),
    );
  }

  return (
    <div className="panel">
      <h2>Your account operations</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Deposit</label>
          <div className="form-group inline">
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(+e.target.value)}
              placeholder="Amount"
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <button
            onClick={handleDeposit}
            className={isLoading ? "loading" : ""}
            disabled={isLoading || !depositAmount}
          >
            {isLoading ? "Converting" : `Deposit ₹${depositAmount || 0}`}
          </button>
        </div>

        <div className="form-group">
          <label>Withdraw</label>
          <div className="form-group inline">
            <input
              type="number"
              value={withdrawalAmount}
              placeholder="Amount"
              onChange={(e) => setWithdrawalAmount(+e.target.value)}
            />
            <button
              onClick={handleWithdrawal}
              disabled={!withdrawalAmount}
              className="secondary"
            >
              Withdraw ₹{withdrawalAmount || 0}
            </button>
          </div>
        </div>

        <div className="form-group">
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
            placeholder="Purpose"
          />
          <button
            onClick={handleRequestLoan}
            disabled={!loanAmount || !loanPurpose || currentLoan > 0}
          >
            {currentLoan > 0 ? "Active loan exists" : "Request loan"}
          </button>
        </div>

        {currentLoan > 0 && (
          <div className="form-group">
            <label>Active loan</label>
            <div className="form-group inline">
              <span>
                ₹{currentLoan} ({currentLoanPurpose})
              </span>
              <button onClick={handlePayLoan} className="danger">
                Pay loan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;


/**
 * Component that handles all banking operations:
 * - Depositing money (with currency conversion)
 * - Withdrawing money
 * - Requesting loans
 * - Paying back loans
 * - Each operation is recorded in transaction history and persisted
 */
