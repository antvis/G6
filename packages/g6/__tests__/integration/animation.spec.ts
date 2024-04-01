import '@/src/preset';
import { createGraphCanvas, getCases, sleep } from '@@/utils';
import * as animationCases from '../demo/animation';

describe('static', () => {
  const cases = getCases(animationCases);

  for (const [name, testCase] of cases) {
    it(`[animation]: ${name}`, async () => {
      const canvas = createGraphCanvas();

      try {
        const { times = [] } = testCase;

        await canvas.init();
        const animationResult = await testCase({ container: canvas, animation: true, theme: 'light' });

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
      } finally {
        canvas.destroy();
        await sleep(50);
      }
    });
  }
});
