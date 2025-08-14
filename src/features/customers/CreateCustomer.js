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
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const dispatch = useDispatch();

  function handleClick() {
    if (!fullName || !nationalId) return;
    dispatch(createCustomer(fullName, nationalId));
  }

  return (
    <div className="panel">
      <h2>Create new customer</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Customer full name</label>
          <input
            value={fullName}
            placeholder="Jane Doe"
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>National ID</label>
          <input
            value={nationalId}
            placeholder="ID number"
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>&nbsp;</label>
          <button onClick={handleClick} disabled={!fullName || !nationalId}>
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCustomer;
