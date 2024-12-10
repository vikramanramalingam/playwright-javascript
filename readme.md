## Page Object Model Pattern with Playwright

This repository contains end-to-end tests built with Playwright to validate key user interactions on a sample web application. The test suite ensures the functionality of critical workflows, including login, registration, account management, and more.

---

## Installation

### Using init command

The easiest way to get started with Playwright Test is to run the init command.

```Shell
# Run from your project's root directory
npm init playwright@latest
# Or create a new project
npm init playwright@latest new-project
```

### Manually

Add dependency and install browsers.

```Shell
npm i -D @playwright/test
# install supported browsers
npx playwright install
```

You can optionally install only selected browsers, see [install browsers](https://playwright.dev/docs/cli#install-browsers) for more details. Or you can install no browsers at all and use existing [browser channels](https://playwright.dev/docs/browsers).

* [Getting started](https://playwright.dev/docs/intro)
* [API reference](https://playwright.dev/docs/api/class-playwright)


## **Test Scenarios**

### **1. Login Test Suite**

The **Login Test Suite** focuses on testing user authentication workflows, including invalid login attempts and user registration. Key scenarios include:

- **Invalid Login:**  
  Attempts to log in with randomly generated invalid credentials and verifies the display of an appropriate error message.

- **User Registration and Login:**  
  Registers a new user using dynamically generated data, logs out, and logs back in to verify access to the account overview.

---

### **2. End-to-End Test Suite**

The **End-to-End Test Suite** ensures the functionality of multiple workflows across different pages. Core test scenarios include:

- **Opening a New Savings Account:**  
  Opens a new savings account and verifies its successful creation.

- **Fund Transfers:**  
  Transfers funds from the newly created account to another account and validates the updated balances.

- **Bill Payment:**  
  Simulates bill payment and confirms the transaction reflects in the account balance and is verified via API.

- **Navigation to Global Sections:**  
  Ensures smooth navigation to various sections, including About Us, Services, Admin, and Products, with correct content display.

---

## **Folder Structure**

The project follows a modular structure for maintainability:

- **`pages/`**: Page Object Models (POM) for different application pages (e.g., `LoginPage`, `RegisterPage`, `HomePage`).
- **`utils/`**: Utility and helper functions (e.g., `PageHelper`, `TestDataHelper`) to simplify repetitive tasks.
- **`api/`**: API utility methods (e.g., `TransactionsApi`) for validating data through backend APIs.

---

## **Dynamic Test Data**

Test data is generated dynamically using the **TestDataHelper** utility. This includes random usernames, passwords, and payee details, ensuring unique test runs without reliance on static data.

---

## **Getting Started**

Follow the steps below to set up and run the Playwright test suite:

### **1. Prerequisites**

Ensure you have the following installed:

- **Node.js** (version 16 or higher)  
- **npm** (comes with Node.js)  
- A text editor or IDE (e.g., VS Code)  

### **2. Clone the Repository**

Clone this repository to your local machine:

```Shell
git clone <https://github.com/vikramanramalingam/playwright-test>
cd <playwright-test>

If you want to run test locally, please follow these steps:

1. Clone this repository
2. Make sure you have `node.js` installed. If you don't, please visit [official website](https://nodejs.org/en/download/) for instructions 
3. Run `npm install` to install node modules
4. That's it, now you can run tests with `npm run test`.
```

## Local Run Results:
- I have attached the screenshot from local run to results folder
- Note: Login with invalid credentials is failin because the application at times throws internal error occured instead of the expected error.
