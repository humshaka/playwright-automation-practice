import { test, expect } from '../fixtures.js';
import { openCheckout } from '../utils/navigation.js';

/**
 * Sanity / smoke suite for the SEP checkout.
 *
 * These tests quickly validate that the core checkout journey is functioning
 * after a change. They cover the critical path rather than every detail of
 * each user story. Run with: npm run test:smoke
 */
test.describe('SEP Sanity Suite', () => {
  test('@smoke SEP: the landing page loads with the program name', async ({
    page,
    appPage,
  }) => {
    await openCheckout(page);
    await expect(page.getByText('Secure checkout', { exact: true })).toBeVisible();
    await expect(appPage.productName).toBeVisible();
  });

  test('@smoke SEP: a customer can complete the full checkout journey', async ({
    goToReview,
    paymentReviewPage,
    confirmationPage,
  }) => {
    await goToReview();
    await paymentReviewPage.pay();
    await expect(confirmationPage.heading).toBeVisible();
  });

  test('@smoke SEP: invalid card data is rejected', async ({
    goToReview,
    paymentReviewPage,
  }) => {
    await goToReview();
    await paymentReviewPage.cardNumber.fill('1234567890123456');
    await paymentReviewPage.zip.click();
    await expect(
      paymentReviewPage.frame.getByText('Your card number is invalid.')
    ).toBeVisible();
  });
});
