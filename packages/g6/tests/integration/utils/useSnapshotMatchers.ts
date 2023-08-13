import {
  toMatchCanvasSnapshot,
  ToMatchCanvasSnapshotOptions,
} from './toMatchCanvasSnapshot';
import {
  toMatchSVGSnapshot,
  ToMatchSVGSnapshotOptions,
} from './toMatchSVGSnapshot';
import {
  toMatchWebGLSnapshot,
  ToMatchWebGLSnapshotOptions,
} from './toMatchWebGLSnapshot';
import {
  toMatchDOMSnapshot,
  ToMatchDOMSnapshotOptions,
} from './toMatchDOMSnapshot';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toMatchCanvasSnapshot(
        dir: string,
        name: string,
        options?: ToMatchCanvasSnapshotOptions,
      ): Promise<R>;
      toMatchSVGSnapshot(
        dir: string,
        name: string,
        options?: ToMatchSVGSnapshotOptions,
      ): Promise<R>;
      toMatchWebGLSnapshot(
        dir: string,
        name: string,
        options?: ToMatchWebGLSnapshotOptions,
      ): Promise<R>;
      toMatchDOMSnapshot(
        dir: string,
        name: string,
        options?: ToMatchDOMSnapshotOptions,
      ): Promise<R>;
    }
  }
}

expect.extend({
  toMatchCanvasSnapshot,
  toMatchSVGSnapshot,
  toMatchWebGLSnapshot,
  toMatchDOMSnapshot,
});
