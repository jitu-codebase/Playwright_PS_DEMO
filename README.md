<!-- @Author: Jitendra Vishwakarma
@created:2026-06-22
@updated:2026-06-22 -->

# 🎭 Playwright PS Demo

A **TypeScript-based UI Test Automation Framework** built with [Playwright](https://playwright.dev/), following the **Page Object Model (POM)** design pattern. This framework automates end-to-end tests against the [SauceDemo](https://www.saucedemo.com) web application.

---

## 🚀 Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Browser automation & test runner |
| TypeScript | Strongly-typed test scripting |
| Faker.js | Dynamic test data generation |
| dotenv | Environment variable management |

---

## 📁 Project Structure

```
playwright_ps_demo/
├── .github/
│   └── workflows/
│       └── playwright.yml      # GitHub Actions CI workflow
├── fixture/
│   └── test-fixture.ts         # Custom Playwright test fixtures
├── src/
│   ├── pages/                  # Page Object Model classes
│   │   ├── login-page.ts
│   │   ├── inventory-page.ts
│   │   ├── cart-page.ts
│   │   ├── checkout_userinfo-page.ts
│   │   ├── checkout_overview-page.ts
│   │   ├── checkout_complete-page.ts
│   │   └── logout-page.ts
│   ├── tests/                  # Test spec files
│   │   └── saucedemo-automate.spec.ts
│   ├── testdata/               # Static test data
│   ├── types/                  # TypeScript type definitions
│   └── utils/                  # Utility/helper functions
├── playwright.config.ts        # Playwright configuration
├── .env                        # Environment variables (not committed)
└── package.json
```

---

## ✨ Key Features

- **Page Object Model** — Clean separation of page interactions from test logic
- **Custom Fixtures** — Reusable test setup via Playwright's fixture system
- **Dynamic Test Data** — Faker.js generates realistic data at runtime
- **Environment Config** — Credentials and base URLs managed via `.env`
- **HTML Reports** — Built-in Playwright HTML reporter

---

## ⚙️ Configuration Highlights

- **Base URL:** `https://www.saucedemo.com`
- **Browser:** Chromium (Desktop Chrome)
- **Execution:** Fully parallel with `slowMo: 500ms` for local visibility
- **Retries:** 1 retry in CI, 0 locally
- **Trace:** Captured on first retry for debugging

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (LTS)
- npm

### Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
USERNAME=your_username
PASSWORD=your_password
```

### Running Tests

```bash
# Run with Playwright UI with tags and workers (parallel execution)
npm run test -- --grep "@sanity" --workers=2 

# Run with Playwright UI with tags and workers and debug mode
npm run test -- --grep "@sanity" --workers=2 --debug
```

---

## 📊 Test Reports

After a test run, open the HTML report:

```bash
npm run report
```

## 📋 Test Coverage

The suite covers the full **SauceDemo** e2e purchase flow:

1. ✅ Login
2. ✅ Browse & add products to cart
3. ✅ Checkout — user info
4. ✅ Checkout — order overview
5. ✅ Order confirmation
6. ✅ Logout
