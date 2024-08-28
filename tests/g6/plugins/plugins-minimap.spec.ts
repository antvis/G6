import { expect, test } from '@playwright/test';

test.describe('plugin minimap', () => {
  test('default', async ({ page }) => {
    page.goto('/?Demo=pluginMinimap&Renderer=canvas&GridLine=true&Theme=light&Animation=false');

    await page.waitForSelector('.g6-minimap');

    const clip = { x: 0, y: 0, width: 500, height: 500 };

    await expect(page).toHaveScreenshot({ clip });

    // wheel on to zoom
    await page.mouse.move(250, 250);

    // 在 github action 中执行时，滚动的距离需要更大
    // In github action, the scroll distance needs to be larger
    await page.mouse.wheel(0, process.env.CI ? 20 : 10);

    await expect(page).toHaveScreenshot({ clip, maxDiffPixels: 100 });

    await page.mouse.wheel(0, process.env.CI ? -40 : -20);

    await expect(page).toHaveScreenshot({ clip, maxDiffPixels: 100 });

    // drag minimap mask
    await page.mouse.move(400, 425);
    await page.mouse.down();
    await page.mouse.move(425, 450, { steps: 10 });
    await page.mouse.up();
    await expect(page).toHaveScreenshot({ clip, maxDiffPixels: 100 });

    // drag mask overflow
    await page.mouse.move(425, 450);
    await page.mouse.down();
    await page.mouse.move(550, 550, { steps: 10 });
    await page.mouse.up();
    await expect(page).toHaveScreenshot({ clip, maxDiffPixels: 100 });

    // drag canvas
    // playwright mouse 模拟操作无法正常触发 g canvas 的 drag 事件
    // 因此这里直接调用 graph 实例的方法
    // playwright mouse simulation operation cannot trigger the drag event of g canvas normally
    // So here directly call the method of the graph instance
    await page.evaluate(() => (window as any).graph.translateTo([100, 100], false));

    await expect(page).toHaveScreenshot({ clip, maxDiffPixels: 100 });
  });
});
