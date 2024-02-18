import '../../src/preset';
import * as staticCases from '../demo/static/common';
import { createNodeGCanvas } from './utils/create-node-g-canvas';
import { getCases } from './utils/get-cases';
import { sleep } from './utils/sleep';
import './utils/use-snapshot-matchers';

describe('static', () => {
  const cases = getCases(staticCases);

  for (const [name, testCase] of cases) {
    it(`[static]: ${name}`, async () => {
      const canvas = createNodeGCanvas();

      try {
        const { preprocess, postprocess } = testCase;
        await preprocess?.();
        await canvas.init();
        await testCase({
          env: 'test',
          canvas,
          animation: false,
          toMatchSVGSnapshot: async (suffix: string) =>
            await expect(canvas).toMatchSVGSnapshot(`${__dirname}/snapshots/static`, `${name}__${suffix}`),
        });
        await expect(canvas).toMatchSVGSnapshot(`${__dirname}/snapshots/static`, name);
        await postprocess?.();
      } finally {
        canvas.destroy();
        await sleep(50);
      }
    });
  }
});
