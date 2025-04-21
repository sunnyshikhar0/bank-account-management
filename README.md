# Bank Account Management Project Structure and Workflow

## Project Structure

The project follows a feature-based architecture using React with Redux:

## Application Workflow

1. **Initialization**:

   - Application starts with index.js rendering the `App` component
   - Redux store is initialized with account and customer slices
   - No customer exists initially (`fullName === ""`)

2. **Customer Registration**:

   - App.js conditionally renders the `CreateCustomer` component
   - User enters name and ID, clicks "Create new customer"
   - `createCustomer` action is dispatched to the Redux store
   - Customer state is updated in Redux

3. **Banking Interface**:

   - Once a customer exists, App.js renders:
     - `Customer` component (welcome message)
     - `AccountOperations` component (transaction forms)
     - `BalanceDisplay` component (current balance)

4. **Account Operations**:
   - **Deposit**: Add money with optional currency conversion
   - **Withdraw**: Remove money from balance
   - **Request Loan**: Get a loan and add to balance
   - **Pay Loan**: Deduct loan amount from balance and clear loan

## State Management

The application uses Redux with the following state structure:

```javascript
{
  account: {
    balance: 0,         // Current account balance
    loan: 0,            // Current loan amount (0 if no active loan)
    loanPurpose: "",    // Purpose of the current loan
    isLoading: false    // Loading state for currency conversion
  },
  customer: {
    fullName: "",       // Customer's full name
    nationalID: "",     // Customer's ID number
    createdAt: ""       // Account creation timestamp
  }
}
```

## Redux Evolution

The project demonstrates three stages of Redux implementation:

1. **Vanilla Redux** (`store-v1.js`)

   - Manual reducers with switch/case
   - Explicit action creators

2. **Redux with Middleware** (`store-v2.js`)

   - Adds thunk for async operations
   - Adds Redux DevTools integration

3. **Redux Toolkit** (`store.js`)
   - Uses `createSlice` for simplified state management
   - Automatic action creation
   - Simpler immutable updates with Immer

This evolution showcases modern Redux best practices.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
