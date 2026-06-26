# Playwright JS Test Automation 🚀

![Playwright](https://img.shields.io/badge/Playwright-JavaScript-green?style=for-the-badge&logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Allure Reporter](https://img.shields.io/badge/Allure_Reporter-HTML-orange?style=for-the-badge&logo=allure-testops&logoColor=white)

## 📝 Description

This repository hosts a robust and maintainable UI test automation framework built with **Playwright** and **JavaScript**. It leverages the **Page Object Model (POM)** design pattern to create organized and reusable test code, focusing on clarity and efficiency for web application testing. The framework is configured to run tests on Chromium and integrates with **Allure Reporter** for comprehensive and interactive test reports.

The project demonstrates practical scenarios for testing login functionality on a sample e-commerce site (`saucedemo.com`), including successful login and error handling for locked-out users. It's an excellent starting point for anyone looking to implement scalable and reliable web UI automation.

## 📋 Table of Contents

*   [🚀 Features](#-features)
*   [🛠️ Tech Stack](#%EF%B8%8F-tech-stack)
*   [📦 Installation](#-installation)
*   [💡 Usage](#-usage)
*   [🤔 How to Use](#-how-to-use)
*   [📂 Project Structure](#-project-structure)
*   [🚫 API Reference](#-api-reference)
*   [🤝 Contributing](#-contributing)
*   [📜 License](#-license)
*   [🔗 Important Links](#-important-links)
*   [©️ Footer](#%EF%B8%8F-footer)

## 🚀 Features

This framework comes packed with features designed for efficient and effective web automation testing:

*   **Playwright Test Runner**: Utilizes Playwright's powerful API for reliable end-to-end testing across modern browsers.
*   **Page Object Model (POM)**: Implements a structured POM approach for better code organization, reusability, and maintainability. Pages and their actions are encapsulated in dedicated classes.
*   **Custom Playwright Fixtures**: Extends Playwright's `test` fixture to provide pre-configured page objects (e.g., `loginPage`) directly to test functions, simplifying test setup.
*   **Base Page Abstraction**: A `BasePage` class provides common web interactions like `goto`, `click`, `fillField`, `getText`, and `waitForVisible` to reduce code duplication.
*   **Allure Reporting Integration**: Generates detailed and interactive HTML test reports using `allure-playwright` for clear test results visualization.
*   **Configurable Test Execution**: `playwright.config.js` allows easy configuration of test timeouts, retries, headless mode, base URL, viewport, screenshot-on-failure, and trace-on-failure.
*   **Login Test Scenarios**: Includes example tests for valid and invalid login attempts on `https://www.saucedemo.com/`.
*   **Chromium Browser Support**: Configured to run tests specifically on the Chromium browser.

## 🛠️ Tech Stack

| Technology    | Description                                       | Version      |
| :------------ | :------------------------------------------------ | :----------- |
| **JavaScript**  | Primary language for the test framework           | ES6+         |
| **Playwright**  | Modern web automation framework for E2E testing   | Latest       |
| **Allure Reporter**| Tool for generating rich, interactive test reports | Latest       |
| **Node.js**     | JavaScript runtime for executing tests            | Latest LTS   |

## 📦 Installation

To get this project up and running on your local machine, follow these steps.

### Prerequisites

Ensure you have the following installed:

*   **Node.js**: (LTS version recommended) You can download it from [nodejs.org](https://nodejs.org/).
*   **npm** (Node Package Manager): Usually comes bundled with Node.js.

### Steps

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/jjalayon/playwright_js_test_automation.git
    cd playwright_js_test_automation
    ```

2.  **Install project dependencies**:

    Since there is no `package.json` provided, you will need to manually install Playwright and Allure dependencies. In a real-world project, a `package.json` would handle this automatically.

    ```bash
    npm init playwright@latest --yes
    npm install allure-playwright
    npx playwright install chromium
    ```
    *Note: The `npm init playwright` command will create a `package.json` and install Playwright. If it prompts you to install a browser, select `chromium`.* If you already have `package.json` just add `@playwright/test` and `allure-playwright` as dependencies.

3.  **Verify installation**:

    You can try running a simple playwright command to ensure everything is set up correctly:

    ```bash
    npx playwright test --help
    ```

## 💡 Usage

This section details how to run the tests and generate reports.

### Running Tests

To execute the Playwright tests, use the Playwright CLI command:

```bash
npx playwright test
```

This command will run all tests located in the `./tests` directory using the configuration specified in `playwright.config.js`. By default, tests will run in headless Chromium mode.

### Generating Allure Reports

After running the tests, Playwright will generate Allure results in the `allure-results` directory. To generate the full HTML report, use the Allure CLI:

```bash
allure generate allure-results --clean
```

This command processes the raw results and creates a human-readable HTML report in the `allure-report` directory.

### Viewing Allure Reports

To open the generated Allure report in your browser, run:

```bash
allure open
```

This will launch a local server and display the interactive report.

*   **Note**: There's a `run-playwright-allure.sh` script in the repository. Although its content wasn't provided, its name suggests it would automate the test execution and Allure report generation/serving steps. You might consider inspecting or completing this script for a streamlined workflow.

## 🤔 How to Use

This project provides a foundational Playwright automation framework. Here's how you can leverage and extend it:

1.  **Understand the Page Object Model (POM)**:
    *   **`resources/actions/BasePage.actions.js`**: Contains generic web interactions. Extend this class for any page-specific actions.
    *   **`resources/actions/LoginPage.actions.js`**: Demonstrates a specific page object for the login page, containing methods like `login()` and `getErrorMessage()`.
    *   **(Inferred) `resources/pageObjects/loginPage.locators.js`**: Although not provided, the `LoginPage.actions.js` uses `loginLocators`. You would create this file to store selectors for each element on the login page, promoting reusability and easy maintenance.

2.  **Write New Tests**: Create new `.spec.js` files inside the `tests/` directory. Utilize the custom fixtures from `fixtures/baseWebFixtures.js` to easily access page objects in your tests.

    Example (from `tests/login.spec.js`):
    ```javascript
    import { test, expect } from '../fixtures/baseWebFixtures';

    test.describe('Login Tests', () => {

      test('TC_01: Should login successfully with valid credentials', async ({ loginPage, page }) => {
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('/inventory.html');
      });

      test('TC_02: Should show error for locked out user', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login('locked_out_user', 'secret_sauce');
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Epic sadface: Sorry, this user has been locked out.');
      });
    });
    ```

3.  **Update `playwright.config.js`**: Modify the `baseURL`, `viewport`, browser projects, and other settings to match your target application and testing requirements.

4.  **Extend Page Objects**: For new pages or complex interactions, create new page object classes and corresponding locator files.

## 📂 Project Structure

The project is organized to promote modularity and maintainability:

```
playwright_js_test_automation/
├── fixtures/                       # Custom Playwright test fixtures
│   └── baseWebFixtures.js          # Base fixture for injecting page objects
├── resources/                      # Contains Page Object Model components
│   ├── actions/                    # Page action classes
│   │   ├── BasePage.actions.js     # Base class for common page interactions
│   │   └── LoginPage.actions.js    # Page object for login functionality
│   └── pageObjects/                # (Inferred) Directory for page locators
│       └── loginPage.locators.js   # (Inferred) Locators for the login page
├── tests/                          # Playwright test specifications
│   └── login.spec.js               # Login test scenarios
├── playwright.config.js            # Playwright configuration file
├── run-playwright-allure.sh        # (Empty content) Shell script for running tests and generating reports
└── README.md                       # Project documentation
```

## 🚫 API Reference

This project is an end-to-end UI test automation framework and does not expose a public API. Its purpose is to interact with web applications through their user interface.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements, bug fixes, or new features, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## 📜 License

No license information was provided for this repository.

## 🔗 Important Links

*   **Repository URL**: [https://github.com/jjalayon/playwright_js_test_automation](https://github.com/jjalayon/playwright_js_test_automation)
*   **Playwright Documentation**: [https://playwright.dev/docs/intro](https://playwright.dev/docs/intro)
*   **Allure Report Documentation**: [https://docs.qameta.io/allure-testops/](https://docs.qameta.io/allure-testops/)

## ©️ Footer

This README was generated for the `playwright_js_test_automation` repository.

Project Link: [https://github.com/jjalayon/playwright_js_test_automation](https://github.com/jjalayon/playwright_js_test_automation)

Developed by: jjalayon

Feel free to ⭐ star, 🍴 fork, or open an 🚨 issue if you find any problems or have suggestions!


---
**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**
