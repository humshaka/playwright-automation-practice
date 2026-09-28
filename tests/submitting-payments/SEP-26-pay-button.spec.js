import { test, expect } from '../fixtures.js';
import { personalDetails } from '../data/sepTestData.js';

// User Story: SEP-26
// Requirement: As a customer, I should be able to click the pay button after I
// agree to the terms and conditions.
// Acceptance criteria:
//   1. The pay button is disabled and the terms & conditions checkbox is
//      unchecked by default.
//   2. The pay button is activated once the user agrees to the terms and
//      conditions.
test.describe('SEP-26: Enabling the Pay button', () => {
  test('SEP-26: Pay is disabled and terms checkbox unchecked by default', async ({
    goToReview,
    paymentReviewPage,
  }) => {
    await goToReview();
    await expect(paymentReviewPage.payButton).toBeDisabled();
    await expect(paymentReviewPage.termsCheckbox).not.toBeChecked();
  });

  test('SEP-26: Pay is enabled after agreeing to terms and conditions', async ({
    goToReview,
    paymentReviewPage,
  }) => {
    await goToReview();
    await paymentReviewPage.acceptTerms();
    await expect(paymentReviewPage.termsCheckbox).toBeChecked();
    await expect(paymentReviewPage.payButton).toBeEnabled();
  });
});
