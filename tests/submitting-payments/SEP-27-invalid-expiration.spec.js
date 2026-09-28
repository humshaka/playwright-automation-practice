import { test, expect } from '../fixtures.js';

// User Story: SEP-27
// Requirement: As a customer, I want to be informed when my card's expiration
// date has failed.
// Acceptance criteria:
//   1. An immediate error message is shown when the expiration year is in the
//      past: "Your card's expiration year is in the past."
test.describe('SEP-27: Error message for an invalid expiration number', () => {
  test('SEP-27: shows an immediate error for an expired card', async ({
    goToReview,
    paymentReviewPage,
  }) => {
    await goToReview();

    // Enter an expiration date in the past.
    await paymentReviewPage.expiration.fill('12/20');
    await paymentReviewPage.zip.click();

    await expect(
      paymentReviewPage.frame.getByText(
        "Your card’s expiration year is in the past."
      )
    ).toBeVisible();
  });
});
