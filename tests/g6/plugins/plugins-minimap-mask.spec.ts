import { expect, test } from '@playwright/test';

const cases = [
  { name: 'contained', width: 137.5, x: 20, y: 20, dx: 5, dy: 7 },
  { name: 'left inward', width: 137.5, x: -20, y: 20, dx: 5, dy: 0 },
  { name: 'left outward', width: 137.5, x: -20, y: 20, dx: -5, dy: 0 },
  { name: 'right inward', width: 137.5, x: 200, y: 20, dx: -5, dy: 0 },
  { name: 'right outward', width: 137.5, x: 200, y: 20, dx: 5, dy: 0 },
  { name: 'top inward', width: 137.5, x: 20, y: -20, dx: 0, dy: 5 },
  { name: 'bottom inward', width: 137.5, x: 20, y: 140, dx: 0, dy: -5 },
  { name: 'clipped corner', width: 137.5, x: -20, y: -20, dx: 5, dy: 5 },
  { name: 'restore full size', width: 137.5, x: -20, y: -20, dx: 60, dy: 60 },
  { name: 'restore full size over multiple moves', width: 137.5, x: -20, y: -20, dx: 60, dy: 60, steps: 12 },
  { name: 'large right and bottom drag', width: 137.5, x: 200, y: 140, dx: -80, dy: -80 },
  { name: 'both sides clipped', width: 275, x: -20, y: -10, dx: 5, dy: 5 },
  { name: 'large viewport clipped left and top', width: 275, x: -80, y: -150, dx: 5, dy: 5 },
  { name: 'large viewport clipped right and bottom', width: 275, x: 20, y: 20, dx: 5, dy: 5 },
];

test.describe('minimap mask stays aligned with the viewport', () => {
  for (const { name, width, x, y, dx, dy, steps = 1 } of cases) {
    test(name, async ({ page }) => {
      await page.goto('/?Demo=pluginMinimap&Renderer=canvas&GridLine=true&Theme=light&Animation=false');
      await page.waitForFunction(() => (window as any).graph?.getPluginInstance('minimap')?.mask);

      await page.evaluate(
        async ({ width, x, y }) => {
          const graph = (window as any).graph;
          const minimap = graph.getPluginInstance('minimap');
          await graph.zoomTo((graph.getZoom() * minimap.maskBBox[2]) / width, false);
          const [currentX, currentY] = minimap.maskBBox;
          const ratio = graph.getZoom() / minimap.canvas.getCamera().getZoom();
          await graph.translateBy([(currentX - x) * ratio, (currentY - y) * ratio], false);
        },
        { width, x, y },
      );

      // Compare the DOM rectangle with the independently projected graph viewport.
      const alignmentError = () =>
        page.evaluate(() => {
          const graph = (window as any).graph;
          const minimap = graph.getPluginInstance('minimap');
          const [minimapWidth, minimapHeight] = minimap.options.size;
          const project = (point: [number, number]) => {
            const [x, y] = graph.getCanvasByViewport(point);
            return minimap.canvas.canvas2Viewport({ x, y });
          };
          const min = project([0, 0]);
          const max = project(graph.getSize());
          const left = Math.max(0, Math.min(min.x, minimapWidth));
          const top = Math.max(0, Math.min(min.y, minimapHeight));
          const expected = [
            left,
            top,
            Math.max(0, Math.min(max.x, minimapWidth) - left),
            Math.max(0, Math.min(max.y, minimapHeight) - top),
          ];
          const actual = ['left', 'top', 'width', 'height'].map((key) => parseFloat(minimap.mask.style[key]));
          return Math.max(...actual.map((value, index) => Math.abs(value - expected[index])));
        });

      await expect.poll(alignmentError).toBeLessThan(0.01);
      const positionBefore = await page.evaluate(() => (window as any).graph.getPosition());
      const mask = page.locator('.g6-minimap > div').last();
      const bounds = (await mask.boundingBox())!;
      const startX = bounds.x + bounds.width / 2;
      const startY = bounds.y + bounds.height / 2;
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await expect
        .poll(() => page.evaluate(() => (window as any).graph.getPluginInstance('minimap').isMaskDragging))
        .toBe(true);
      await page.mouse.move(startX + dx, startY + dy, { steps });
      await page.mouse.up();

      await expect.poll(alignmentError).toBeLessThan(0.01);
      if (name === 'contained') {
        const positionAfter = await page.evaluate(() => (window as any).graph.getPosition());
        expect(positionAfter[0]).toBeLessThan(positionBefore[0]);
        expect(positionAfter[1]).toBeLessThan(positionBefore[1]);
      }
    });
  }
});
