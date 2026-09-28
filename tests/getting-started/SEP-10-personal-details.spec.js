import { test, expect } from '../fixtures.js';
import { personalDetails } from '../data/sepTestData.js';
import { openCheckout } from '../utils/navigation.js';

// User Story: SEP-10
// Requirement: As a customer, I should be able to enter my Personal details.
// Acceptance criteria (default field types and values):
//   a. First Name: text field is present.
//   b. Last Name: text field is present.
//   c. Email Address: text field is present and validates email format.
//   d. Phone: the field allows numbers only.
test.describe('SEP-10: Personal details form', () => {
  test.beforeEach(async ({ page }) => {
    await openCheckout(page);
  });

  test('SEP-10: shows the required personal detail fields', async ({
    appPage,
  }) => {
    await expect(appPage.firstName).toBeVisible();
    await expect(appPage.lastName).toBeVisible();
    await expect(appPage.email).toBeVisible();
    await expect(appPage.phone).toBeVisible();
  });

  test('SEP-10: email field is configured for email format validation', async ({
    appPage,
  }) => {
    // The email field uses native email validation and is required, which is
    // how the application enforces email format.
    await expect(appPage.email).toHaveAttribute('type', 'email');
    await expect(appPage.email).toHaveAttribute('required', '');
    await expect(appPage.firstName).toHaveAttribute('required', '');
    await expect(appPage.lastName).toHaveAttribute('required', '');
    await expect(appPage.phone).toHaveAttribute('required', '');
  });

  test('SEP-10: allows a valid email and proceeds', async ({ appPage }) => {
    await appPage.fillPersonalDetails();
    await appPage.nextButton.click();
    await expect(appPage.page.getByText('Choose a payment plan')).toBeVisible();
  });

  test('SEP-10: blocks navigation when the email format is invalid', async ({
    page,
    appPage,
  }) => {
    // The email field is type="email" + required, so the browser's native
    // validation prevents advancing to step two when the format is invalid.
    await appPage.fillPersonalDetails({ ...personalDetails, email: 'not-an-email' });
    await appPage.nextButton.click();

    // Still on step one - step two must not be reached.
    await expect(appPage.firstName).toBeVisible();
    await expect(page.getByText('Choose a payment plan')).not.toBeVisible();
  });
});
