# SEP User Story Traceability Matrix

This document maps every SEP user story (from the `SEP_Epics & User Stories`
spreadsheet) to its automated test file(s) and Page Object(s).

| User Story | Title | Test File | Page Object | Status |
|------------|-------|-----------|-------------|--------|
| SEP-07 | View Product Landing Page | `tests/getting-started/SEP-07-landing-page.spec.js` | `ApplicationPage.js` | ✅ Automated |
| SEP-08 | Display the steps of the checkout process | `tests/getting-started/SEP-08-stepper.spec.js` | `ApplicationPage.js` | ✅ Automated |
| SEP-09 | Display the product information | `tests/getting-started/SEP-09-product-info.spec.js` | `ApplicationPage.js` | ✅ Automated |
| SEP-10 | Enter my personal details | `tests/getting-started/SEP-10-personal-details.spec.js` | `ApplicationPage.js` | ✅ Automated |
| SEP-11 | Program start dates and Refund dates | `tests/getting-started/SEP-11-dates-refund.spec.js` | `ApplicationPage.js` | ✅ Automated |
| SEP-14 | Selecting a payment plan | `tests/payment-plans/SEP-14-select-plan.spec.js` | `PaymentPlanPage.js` | ✅ Automated |
| SEP-16 | Click Next button on payment plans page | `tests/payment-plans/SEP-16-next-payment.spec.js` | `PaymentPlanPage.js`, `PaymentReviewPage.js` | ✅ Automated |
| SEP-17 | View payment plan options in Step 2 | `tests/payment-plans/SEP-17-plan-options.spec.js` | `PaymentPlanPage.js` | ✅ Automated |
| SEP-19 | Click on the next button on step 1 | `tests/submitting-payments/SEP-19-next-step1.spec.js` | `ApplicationPage.js` | ✅ Automated |
| SEP-23 | Make a payment | `tests/submitting-payments/SEP-23-make-payment.spec.js` | `PaymentReviewPage.js`, `ConfirmationPage.js` | ✅ Automated |
| SEP-26 | Enabling The Pay button | `tests/submitting-payments/SEP-26-pay-button.spec.js` | `PaymentReviewPage.js` | ✅ Automated |
| SEP-27 | Error message for invalid expiration | `tests/submitting-payments/SEP-27-invalid-expiration.spec.js` | `PaymentReviewPage.js` | ✅ Automated |
| SEP-28 | Error message for invalid card number | `tests/submitting-payments/SEP-28-invalid-card.spec.js` | `PaymentReviewPage.js` | ✅ Automated |
| SEP-29 | Error message for invalid CVC number | `tests/submitting-payments/SEP-29-invalid-cvc.spec.js` | `PaymentReviewPage.js` | ✅ Automated |

## Epics covered

- **Getting Started**: SEP-07, SEP-08, SEP-09, SEP-10, SEP-11
- **Payment Plans**: SEP-14, SEP-16, SEP-17
- **Submitting Payments**: SEP-19, SEP-23, SEP-26, SEP-27, SEP-28, SEP-29

## Smoke / Sanity suite

`tests/sanity/sep-sanity.spec.js` (tagged `@smoke`) validates the critical
checkout journey end-to-end, covering the landing page, a full payment, and an
invalid-card rejection.

## Notes on requirement interpretation

- **SEP-07 acceptance criterion 1** states the page displays "Cydeo Secure
  Checkout". The live application renders the heading as **"Secure checkout"**,
  so the automated test asserts the text actually rendered by the application.
- **SEP-10** states the email field "validates for email format" and the phone
  field "allows numbers only". The email field is implemented with
  `type="email"` and `required`; the suite asserts those attributes **and**
  behaviorally confirms that an invalid email prevents advancing to Step 2.
  The phone field, however, has **no** `type`/`pattern`/input filtering in the
  live application and accepts non-numeric characters — so the "numbers only"
  criterion is **not enforced by the application**. This is flagged as an
  ambiguous requirement / potential application defect rather than asserted as
  passing behaviour.
- **SEP-08 / SEP-16** reference stepper colours (blue active / grey upcoming /
  green completed). The tests verify the step labels are present and that the
  active step is visually distinct, which is the stable, non-fragile way to
  validate the highlighted step.
