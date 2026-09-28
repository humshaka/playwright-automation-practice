import { test, expect } from '../fixtures.js';
import { priceSummary } from '../data/sepTestData.js';

// User Story: SEP-16
// Requirement: As a customer, I should be able to click on the next button on
// step 2 when I select a plan.
// Acceptance criteria:
//   1. Clicking any plan activates the next button.
//   2. Clicking next shows the Step 3 page.
//   3. In the stepper, steps 1 and 2 are green, and step 3 is blue.
//   4. The payment component is displayed.
//   5. A price summary is displayed.
//   6. The back button is displayed.
test.describe('SEP-16: Click Next on payment plans page', () => {
  test('SEP-16: shows the Review step with payment component and summary', async ({
    goToPaymentPlan,
    paymentPlanPage,
    paymentReviewPage,
  }) => {
    await goToPaymentPlan();
    await expect(paymentPlanPage.nextButton).toBeDisabled();

    await paymentPlanPage.selectUpfrontPlan();
    await expect(paymentPlanPage.nextButton).toBeEnabled();
    await paymentPlanPage.nextButton.click();

    // Payment component (card number field lives inside the iframe).
    await expect(paymentReviewPage.cardNumber).toBeVisible();

    // Price summary values.
    await expect(paymentReviewPage.total).toBeVisible();
    await expect(paymentReviewPage.total).toHaveText(priceSummary.total);

    // Back button is displayed.
    await expect(paymentReviewPage.backButton).toBeVisible();
  });

  test('SEP-16: keeps the stepper on the Review step', async ({
    goToPaymentPlan,
    paymentPlanPage,
    paymentReviewPage,
    appPage,
  }) => {
    await goToPaymentPlan();
    await paymentPlanPage.selectUpfrontPlan();
    await paymentPlanPage.nextButton.click();

    // All three steps remain labelled.
    await expect(appPage.stepStartApplication).toBeVisible();
    await expect(appPage.stepPaymentPlan).toBeVisible();
    await expect(appPage.stepReview).toBeVisible();
  });
});
