import '../../src/preset';
import * as animationCases from '../demo/animation';
import { createGraphCanvas } from '../mock/create';
import { getCases } from './utils/get-cases';
import { sleep } from './utils/sleep';
import './utils/use-snapshot-matchers';

describe('static', () => {
  const cases = getCases(animationCases);

  for (const [name, testCase] of cases) {
    it(`[animation]: ${name}`, async () => {
      const canvas = createGraphCanvas();

      try {
        const { times = [], preprocess, postprocess } = testCase;

        await preprocess?.();
        await canvas.init();
        const animationResult = await testCase({ env: 'test', canvas, animation: true, expect });

        if (!animationResult) throw new Error('animation result should not be null');

        animationResult.pause();

        for (const time of times) {
          animationResult.currentTime = time;
          await sleep(32);
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
