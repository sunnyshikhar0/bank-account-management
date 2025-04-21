import { useSelector } from "react-redux";

/**
 * Customer welcome component - displays a greeting to the logged-in customer
 *
 * This component:
 * - Retrieves the customer name from the Redux store using useSelector
 * - Displays a personalized welcome message with an emoji
 *
 * Relationships:
 * - Reads customer data from customerSlice (customer.fullName)
 * - Rendered in App.js after successful customer creation
 * - Part of the main banking interface along with AccountOperations and BalanceDisplay
 * - Only shown when a customer exists (fullName !== "")
 *
 * Note: This is different from CreateCustomer.js which handles the initial registration
 */
function Customer() {
  // Access customer's full name from the Redux store
  const customer = useSelector((store) => store.customer.fullName);

  // Return welcome message with customer's name
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
