import { delay } from '../../../src/utils/delay';

describe('delay', () => {
  it('should delay for the specified time', async () => {
    const startTime = Date.now();
    const delayTime = 200; // milliseconds

    await delay(delayTime);

    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    expect(elapsedTime).toBeGreaterThanOrEqual(delayTime);
  });
});
