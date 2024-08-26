import { expect, test } from '@playwright/test';

test.describe('element node html', () => {
  test('html', async ({ page }) => {
    await page.goto('/?Demo=elementNodeHTML&Renderer=canvas&GridLine=true&Theme=light&Animation=false');

    await page.waitForSelector('.key');

    const clip = { x: 100, y: 100, width: 240, height: 180 };

    await expect(page).toHaveScreenshot({ clip });
  });
});
