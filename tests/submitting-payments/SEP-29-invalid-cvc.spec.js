import { test, expect } from '../fixtures.js';

// User Story: SEP-29
// Requirement: As a customer, I want to be informed when the CVC number I
// enter is incorrect or too short.
// Acceptance criteria:
//   1. An immediate error message is shown when the CVC is too short:
//      "Your card's security code is incomplete."
test.describe('SEP-29: Error message for an invalid CVC number', () => {
  test('SEP-29: shows an immediate error for a too-short CVC', async ({
    goToReview,
    paymentReviewPage,
  }) => {
    await goToReview();

    // Enter a CVC that is too short.
    await paymentReviewPage.securityCode.fill('12');
    await paymentReviewPage.zip.click();

    await expect(
      paymentReviewPage.frame.getByText('Your security code is incomplete.')
    ).toBeVisible();
  });
});
