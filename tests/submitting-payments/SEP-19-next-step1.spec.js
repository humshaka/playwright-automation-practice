import { test, expect } from '../fixtures.js';
import { personalDetails } from '../data/sepTestData.js';
import { openCheckout } from '../utils/navigation.js';

// User Story: SEP-19
// Requirement: As a customer, I should be able to click on the next button on
// step 1 when I give valid information.
// Acceptance criteria:
//   1. The next button takes the customer to step two with valid information.
//      a. Test by providing all fields.
//      b. Test by providing only the required fields.
test.describe('SEP-19: Click next button on step 1', () => {
  test('SEP-19: proceeds to step two with all fields filled', async ({
    page,
    appPage,
  }) => {
    await openCheckout(page);
    await appPage.completeStepOne();
    await expect(page.getByText('Choose a payment plan')).toBeVisible();
  });

  test('SEP-19: proceeds to step two with only required fields', async ({
    page,
    appPage,
  }) => {
    await openCheckout(page);
    // Only the required fields (first, last, email, phone) are provided. The
    // referral source is optional and left empty.
    await appPage.fillPersonalDetails(personalDetails);
    await appPage.nextButton.click();
    await expect(page.getByText('Choose a payment plan')).toBeVisible();
  });
});
