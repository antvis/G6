import { createGraphCanvas, getCases, sleep } from '@@/utils';
import * as staticCases from '../demo/static/common';

describe('static', () => {
  const cases = getCases(staticCases);

  for (const [name, testCase] of cases) {
    it(`[static]: ${name}`, async () => {
      const canvas = createGraphCanvas();

      try {
        await canvas.init();
        await testCase({
          container: canvas,
          animation: false,
          theme: 'light',
        });
        await expect(canvas).toMatchSVGSnapshot(`${__dirname}/snapshots/static`, name);
      } finally {
        canvas.destroy();
        await sleep(50);
      }
    });
  }
});
