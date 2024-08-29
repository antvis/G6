import { expect, test } from '@playwright/test';

test.describe('plugin tooltip', () => {
  test('bug: tooltip should has correct position after graph resize', async ({ page }) => {
    page.goto('/?Demo=bugTooltipResize&Renderer=canvas&GridLine=true&Theme=light&Animation=false');

    await page.waitForSelector('.tooltip');

    const clip = { x: 0, y: 0, width: 500, height: 500 };

    await page.mouse.move(375, 250);

    await expect(page).toHaveScreenshot({ clip });

    await page.mouse.move(250, 250);

    // wait for div content is 'resize'
    const resize = page.getByRole('button', { name: 'resize' });

    await resize?.click();

    await page.mouse.move(285, 250);

    await expect(page).toHaveScreenshot({ clip });
  });
});
