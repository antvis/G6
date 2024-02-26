import { ToMatchSVGSnapshotOptions, toMatchSVGSnapshot, toMatchSnapshot } from './to-match-svg-snapshot';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toMatchSVGSnapshot(dir: string, name: string, options?: ToMatchSVGSnapshotOptions): Promise<R>;
      toMatchSnapshot(dir: string, format?: string, options?: ToMatchSVGSnapshotOptions): Promise<R>;
    }
  }
}

expect.extend({
  toMatchSVGSnapshot,
  toMatchSnapshot,
});
