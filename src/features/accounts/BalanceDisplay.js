import { useSelector } from "react-redux";

/**
 * Formats a numeric value as Indian Rupee currency
 * Uses the Intl.NumberFormat API for locale-aware formatting
 *
 * @param {number} value - The numeric amount to format
 * @returns {string} Formatted currency string with ₹ symbol and proper formatting
 */
function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "INR",
  }).format(value);
}

/**
 * Component that displays the current account balance
 *
 * This component:
 * - Extracts balance from the Redux store using useSelector
 * - Formats it as INR currency
 * - Displays it in a fixed position (via CSS class "balance")
 *
 * Relationships:
 * - Reads balance from accountSlice (updated by deposit, withdraw, requestLoan, payLoan actions)
 * - Renders in App.js only when a customer exists (fullName !== "")
 * - CSS styling in index.css positions this as a floating balance display
 */

function BalanceDisplay() {
  // Access the balance property from the account slice of the Redux store
  const balance = useSelector((store) => store.account.balance);

  // Render the formatted balance in a div with "balance" class
  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
