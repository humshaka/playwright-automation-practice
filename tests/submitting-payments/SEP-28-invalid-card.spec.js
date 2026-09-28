import { test, expect } from '../fixtures.js';

// User Story: SEP-28
// Requirement: As a customer, I want to be informed when the card number I
// enter is invalid.
// Acceptance criteria:
//   1. An immediate error message is shown when the card number is invalid:
//      "Your card number is invalid."
test.describe('SEP-28: Error message for an invalid card number', () => {
  test('SEP-28: shows an immediate error for an invalid card number', async ({
    goToReview,
    paymentReviewPage,
  }) => {
    await goToReview();

    // Enter a complete but invalid card number.
    await paymentReviewPage.cardNumber.fill('1234567890123456');
    // Trigger validation by moving focus away from the field.
    await paymentReviewPage.zip.click();

    await expect(
      paymentReviewPage.frame.getByText('Your card number is invalid.')
    ).toBeVisible();
  });
});
