import { createGraphCanvas, getCases, sleep } from '@@/utils';
import { clear, mock } from 'jest-random-mock';
import * as staticCases from '../demo/static/common';

describe('static', () => {
  beforeEach(() => {
    // Mock random number generator,
    // use the deterministic random number generator,
    // so that the test result of layout is deterministic.
    mock();
  });

  afterEach(() => {
    // Restore the random number generator.
    clear();
  });

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
