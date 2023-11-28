import {
  toMatchSVGSnapshot,
  ToMatchSVGSnapshotOptions,
} from './toMatchSVGSnapshot';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toMatchSVGSnapshot(
        dir: string,
        name: string,
        options?: ToMatchSVGSnapshotOptions,
      ): Promise<R>;
    }
  }
}

expect.extend({
  toMatchSVGSnapshot,
});
