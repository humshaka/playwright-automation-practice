import { test, expect } from '../fixtures.js';
import { personalDetails } from '../data/sepTestData.js';

// User Story: SEP-23
// Requirement: As a customer, I should be able to make payments so I can
// enroll in the program.
// Acceptance criteria:
//   1. With valid card info, terms checked and Pay clicked, the user is
//      redirected to the confirmation page.
//   2. In the stepper, steps 1, 2, 3 should be green.
//   3. The correct program name is displayed.
//   4. The correct user email is displayed.
//   5. The correct company contact information is displayed.
test.describe('SEP-23: Make a payment', () => {
  test('SEP-23: completes a payment and reaches the confirmation page', async ({
    goToReview,
    paymentReviewPage,
    confirmationPage,
  }) => {
    await goToReview();

    await paymentReviewPage.pay();

    // Confirmation page is shown with the success heading.
    await expect(confirmationPage.heading).toBeVisible();

    // The program name and the user's email appear in the confirmation message.
    await expect(
      confirmationPage.confirmationMessageFor(personalDetails.email)
    ).toBeVisible();

    // Company contact information is displayed. Exact match targets the
    // contact email spans in the Support section (not the repeated footer).
    await expect(
      confirmationPage.page.getByText('enrollment@cydeo.com', { exact: true })
    ).toBeVisible();
    await expect(
      confirmationPage.page.getByText('support@cydeo.com', { exact: true })
    ).toBeVisible();
  });

  test('SEP-23: displays the Onboarding guidance on the confirmation page', async ({
    goToReview,
    paymentReviewPage,
    confirmationPage,
  }) => {
    await goToReview();
    await paymentReviewPage.pay();

    await expect(confirmationPage.onboardingHeading).toBeVisible();
    await expect(confirmationPage.supportHeading).toBeVisible();
  });
});
