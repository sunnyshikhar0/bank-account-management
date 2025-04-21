import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import { useSelector } from "react-redux";

/**
 * Main application component that controls the overall app flow
 *
 * This component:
 * - Determines whether to show customer creation form or banking interface
 * - Acts as the container for all other components
 * - Uses Redux to track customer state
 *
 * Application flow:
 * 1. Initial state: No customer exists (fullName === "")
 *    → Show CreateCustomer component for registration
 * 2. After customer creation (via createCustomer action in customerSlice):
 *    → Show banking interface with Customer, AccountOperations, and BalanceDisplay
 *
 * Redux connections:
 * - Uses customerSlice to determine if a customer exists
 * - Child components connect to accountSlice for balance and banking operations
 */
function App() {
  // Access customer name from Redux store to determine app state
  const fullName = useSelector((state) => state.customer.fullName);

  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {/* Conditional rendering based on customer existence */}
      {fullName === "" ? (
        // No customer exists → show registration form
        <CreateCustomer />
      ) : (
        // Customer exists → show banking interface
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
