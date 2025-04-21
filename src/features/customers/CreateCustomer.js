import { useState } from "react";
import { createCustomer } from "./customerSlice";
import { useDispatch } from "react-redux";

/**
 * Customer creation component - serves as the entry point to the application
 *
 * This component:
 * - Displays a form to capture customer details (name and national ID)
 * - Creates a new customer in the Redux store on form submission
 * - Is only shown when no customer exists in the application
 *
 * Application flow:
 * 1. App.js conditionally renders this component when fullName === ""
 * 2. User enters their details and submits the form
 * 3. After customer creation, App.js switches to show the Customer,
 *    AccountOperations and BalanceDisplay components
 */
function CreateCustomer() {
  // Local state for form inputs
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");

  // Get the dispatch function to send actions to Redux store
  const dispatch = useDispatch();

  /**
   * Form submission handler
   * - Validates that both fields have values
   * - Dispatches createCustomer action to the Redux store
   * - createCustomer action is defined in customerSlice.js and includes:
   *   - fullName: Customer's full name
   *   - nationalId: Customer's national ID
   *   - createdAt: Automatically generated timestamp
   */
  function handleClick() {
    if (!fullName || !nationalId) return;
    dispatch(createCustomer(fullName, nationalId));
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <div className="inputs">
        {/* Full name input field */}
        <div>
          <label>Customer full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* National ID input field */}
        <div>
          <label>National ID</label>
          <input
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>

        {/* Submit button - triggers customer creation */}
        <button onClick={handleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default CreateCustomer;
