# Playwright Automation Practice — SEP QA

A real-world QA automation project that automates the **SEP (Secure
Enrollment Platform)** checkout application using **Playwright + JavaScript**,
following the **Page Object Model** and clean, maintainable test architecture.

---

## 1. Project Purpose

This project demonstrates professional QA automation engineering by driving
the SEP checkout automation directly from the **SEP user stories** (stored in
the `SEP_Epics & User Stories` spreadsheet / Google Sheet). Every automated
test is traceable back to a specific user story. See
[`docs/SEP-TRACEABILITY.md`](docs/SEP-TRACEABILITY.md).

## 2. Application Under Test

| Item | Value |
|------|-------|
| Name | SEP (Secure Enrollment Platform) — Checkout |
| QA URL | `https://qa.sep.tdtm.cydeo.com/taws` |
| Authentication | HTTP Basic Authentication |

The application is an Angular checkout flow with three steps:

1. **Start Application** — product information + personal details form.
2. **Payment Plan** — choose an Upfront or Installment plan.
3. **Review** — payment card details (Stripe iframe), price summary, terms,
   and the Pay button.

## 3. Technology Stack

- **JavaScript** (no TypeScript)
- **Playwright Test** (`@playwright/test`)
- **dotenv** for environment variables
- **Page Object Model**
- Reusable fixtures, utilities, and separated test data
- HTML reporting, screenshots and traces on failure

## 4. Installation

```bash
# 1. Install dependencies
npm install

# 2. Install the browser(s)
npx playwright install chromium

# 3. Create your environment file from the template
cp .env.example .env
# Then edit .env and fill in the real values.
```

> The `.env` file is ignored by Git (see `.gitignore`). Credentials are never
> committed.

## 5. Environment Variables

Copy `.env.example` to `.env` and set:

```bash
SEP_QA_URL=https://qa.sep.tdtm.cydeo.com/taws
SEP_USERNAME=your-username
SEP_PASSWORD=your-password
```

These are read at runtime by `dotenv` in the Playwright config and utility
modules. **Never hardcode credentials in test files.**

## 6. How to Run Tests

```bash
npm test                 # run the full regression suite
npm run test:headed      # run in headed mode (see the browser)
npm run test:debug       # run with the Playwright inspector
npm run test:smoke       # run only the @smoke sanity suite
npm run test:regression  # run the full regression suite
npm run test:report      # open the HTML report after a run
npm run codegen          # launch Playwright codegen against SEP
```

## 7. Smoke Tests

`tests/sanity/sep-sanity.spec.js` (tagged `@smoke`) quickly validates the
critical checkout journey:

- The landing page loads.
- A customer can complete the full checkout.
- Invalid card data is rejected.

```bash
npm run test:smoke
```

## 8. Regression Tests

The full regression suite runs every user-story spec under `tests/`:

## 10. Reports

Playwright produces an **HTML report** after each run:

```bash
npm run test:report
```

The report shows passed/failed tests, duration, screenshots, and traces.

## 11. Project Structure

```
├── .env.example              # Environment variable template (no secrets)
├── .gitignore                # Ignores node_modules, .env, reports, etc.
├── .prettierrc               # Prettier formatting config
├── playwright.config.js      # Playwright configuration
├── package.json              # Scripts & dependencies
├── docs/
│   └── SEP-TRACEABILITY.md   # User story -> test -> page object mapping
└── tests/
    ├── fixtures.js           # Shared page-object fixtures & flows
    ├── pages/                # Page Objects
    │   ├── ApplicationPage.js
    │   ├── PaymentPlanPage.js
    │   ├── PaymentReviewPage.js
    │   └── ConfirmationPage.js
    ├── utils/
    │   ├── env.js            # Environment variable access
    │   └── navigation.js     # Shared navigation helper
    ├── data/
    │   └── sepTestData.js    # Separated test data
    ├── getting-started/      # SEP-07, 08, 09, 10, 11
    ├── payment-plans/        # SEP-14, 16, 17
    ├── submitting-payments/  # SEP-19, 23, 26, 27, 28, 29
    └── sanity/
        └── sep-sanity.spec.js  # @smoke sanity suite
```

## 12. User-Story Traceability

Each spec is named after its user story (e.g. `SEP-23-make-payment.spec.js`)
and its test titles start with the story ID:

```js
test('SEP-23: completes a payment and reaches the confirmation page', async ({ ... }) => { ... });
```

See [`docs/SEP-TRACEABILITY.md`](docs/SEP-TRACEABILITY.md) for the full matrix.

## 13. Locator Strategy

Locators follow this priority (stable, user-facing first):

1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByTestId()`
5. `getByText()`
6. CSS (only where semantic locators are impractical)

Fragile absolute XPath and generated Angular class names are avoided. Angular
Material `mat-select` dropdowns are located by their accessible combobox role
and stable labels. Stripe card fields live inside an **iframe** and are
targeted via `frameLocator('iframe[title="Secure payment input frame"]')`.

## 14. Page Object Model

Each major page/step has its own Page Object under `tests/pages/`. Page Objects
own their **locators** and **page-level actions**. Assertions live in the test
files so tests stay readable and business-focused. Shared flows (navigating to
Step 2 / Step 3) are exposed as **fixtures** in `tests/fixtures.js` to avoid
duplication.

## 15. Common Troubleshooting

- **"element(s) not found" on the landing page** — `page.goto('/')` resolves to
  the origin root and is redirected to the public marketing site. Always use
  the `openCheckout(page)` helper (from `tests/utils/navigation.js`), which
  navigates to the full `SEP_QA_URL`.
- **Authentication errors** — the QA environment uses HTTP Basic Auth. The
  credentials are provided via `httpCredentials` in `playwright.config.js`
  from the `.env` file.
- **Strict-mode violations** — if a text locator matches multiple elements,
  refine it with `{ exact: true }` or target the stable element class.
- **Multiple Stripe iframes** — always scope card-field locators to the
  payment iframe by its `title` attribute, never by its dynamic name.
- **Credential leaks** — never log or print `SEP_PASSWORD`, and never put it in
  test titles, the README, or source control.

---

> **Security**: The `.env` file containing credentials is excluded from Git.
> If you ever accidentally commit it, rotate the credentials and remove the
> file from history immediately.

```bash
npm test
```

## 9. Debugging

- **VS Code**: install the **Playwright Test for VSCode** extension and the
  tests are auto-discovered (green play buttons next to each `test()`).
- **CLI**: use `npm run test:debug` to step through a test with the inspector.
- On failure, Playwright captures a screenshot, a trace, and a video for you.
