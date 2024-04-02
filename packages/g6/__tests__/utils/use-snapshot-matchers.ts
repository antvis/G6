import {
  ToMatchSVGSnapshotOptions,
  toMatchAnimation,
  toMatchSVGSnapshot,
  toMatchSnapshot,
} from './to-match-svg-snapshot';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toMatchSVGSnapshot(dir: string, name: string, options?: ToMatchSVGSnapshotOptions): Promise<R>;
      toMatchSnapshot(dir: string, detail?: string, options?: ToMatchSVGSnapshotOptions): Promise<R>;
      toMatchAnimation(
        dir: string,
        frames: number[],
        operation: () => void | Promise<void>,
        detail?: string,
        options?: ToMatchSVGSnapshotOptions,
      ): Promise<R>;
    }
  }
}

expect.extend({
  toMatchSVGSnapshot,
  toMatchSnapshot,
  toMatchAnimation,
});
