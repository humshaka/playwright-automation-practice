import { test, expect } from '../fixtures.js';
import { product } from '../data/sepTestData.js';
import { openCheckout } from '../utils/navigation.js';

// User Story: SEP-09
// Requirement: As a customer, I should be able to see the product information.
// Acceptance criteria:
//   1. The product name is displayed on the information card.
//   2. The card name matches the name on the left side of the screen.
//   3. The price of the product is displayed.
//   4. Text indicating a flexible payment plan is displayed.
//   5. The program start date is displayed.
//   6. The return policy and final date for returns are displayed.
test.describe('SEP-09: Product information', () => {
  test.beforeEach(async ({ page }) => {
    await openCheckout(page);
  });

  test('SEP-09: displays the product name on the information card', async ({
    appPage,
  }) => {
    await expect(appPage.productName).toBeVisible();
  });

  test('SEP-09: card name matches the program name on the left side', async ({
    page,
    appPage,
  }) => {
    const cardName = (await appPage.productName.first().textContent()).trim();
    const leftName = (
      await page.getByRole('link', { name: product.name }).textContent()
    ).trim();
    expect(cardName).toBe(leftName);
  });

  test('SEP-09: displays the product price', async ({ appPage }) => {
    await expect(appPage.upfrontPrice).toBeVisible();
  });

  test('SEP-09: displays the flexible payment plan text', async ({
    appPage,
  }) => {
    await expect(appPage.flexiblePaymentsNote).toBeVisible();
  });

  test('SEP-09: displays the program start date', async ({ appPage }) => {
    await expect(appPage.programStartDate).toBeVisible();
  });

  test('SEP-09: displays the refund policy and final return date', async ({
    appPage,
  }) => {
    await expect(appPage.refundPolicy).toBeVisible();
  });
});
