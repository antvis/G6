import * as animationCases from '../demo/animation';
import { createNodeGCanvas } from './utils/create-node-g-canvas';
import { getCases } from './utils/get-cases';
import { sleep } from './utils/sleep';
import './utils/use-snapshot-matchers';

describe('static', () => {
  const cases = getCases(animationCases);

  for (const [name, testCase] of cases) {
    it(`[animation]: ${name}`, async () => {
      const canvas = createNodeGCanvas();

      try {
        const { times = [], preprocess, postprocess } = testCase;

        await preprocess?.();
        const animationResult = await testCase({ canvas });
        animationResult.pause();

        for (const time of times) {
          animationResult.currentTime = time;
          await sleep(20);
          await expect(canvas).toMatchSVGSnapshot(
            `${__dirname}/snapshots/animation`,
            // 命名示例：label-1000(1_3)
            // naming example: label-1000(1_3)
            `${name}-${time}(${times.indexOf(time) + 1}_${times.length})`,
          );
        }

        await postprocess?.();
      } finally {
        canvas.destroy();
        await sleep(50);
      }
    });
  }
});
