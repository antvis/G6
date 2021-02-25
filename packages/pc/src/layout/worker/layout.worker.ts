import WebWorker from './work';

interface Event {
  type: string;
  data: any;
}

export const LayoutWorker = (
  workerScirptURL: string = 'https://unpkg.com/@antv/layout@latest/dist/layout.min.js',
) => {
  function workerCode() {
    // @ts-ignore
    importScripts(workerScirptURL);
    const LAYOUT_MESSAGE = {
      // run layout
      RUN: 'LAYOUT_RUN',
      // layout ended with success
      END: 'LAYOUT_END',
      // layout error
      ERROR: 'LAYOUT_ERROR',
      // layout tick, used in force directed layout
      TICK: 'LAYOUT_TICK',
      GPURUN: 'GPU_LAYOUT_RUN',
      GPUEND: 'GPU_LAYOUT_END',
    };

    function isLayoutMessage(event: Event) {
      const { type } = event.data;
      return type === LAYOUT_MESSAGE.RUN || type === LAYOUT_MESSAGE.GPURUN;
    }

    function handleLayoutMessage(event: Event) {
      const { type } = event.data;
      switch (type) {
        case LAYOUT_MESSAGE.RUN: {
          const { nodes, edges, layoutCfg = {} } = event.data;
          const { type: layoutType } = layoutCfg;
          // @ts-ignore
          const LayoutClass = layout.getLayoutByName(layoutType);
          if (!LayoutClass) {
            this.postMessage({
              type: LAYOUT_MESSAGE.ERROR,
              message: `layout ${layoutType} not found`,
            });
            break;
          }

          const layoutMethod = new LayoutClass(layoutCfg);
          layoutMethod.init({ nodes, edges });
          layoutMethod.execute();
          this.postMessage({ type: LAYOUT_MESSAGE.END, nodes });
          layoutMethod.destroy();
          break;
        }

        case LAYOUT_MESSAGE.GPURUN: {
          const { nodes, edges, layoutCfg = {}, canvas } = event.data;

          const { type: layoutType } = layoutCfg;
          // @ts-ignore
          const LayoutClass = layout.getLayoutByName(layoutType);
          if (!LayoutClass) {
            this.postMessage({
              type: LAYOUT_MESSAGE.ERROR,
              message: `layout ${layoutType} not found`,
            });
            break;
          }
          if (layoutType.split('-')[1] !== 'gpu') {
            this.postMessage({
              type: LAYOUT_MESSAGE.ERROR,
              message: `layout ${layoutType} does not support GPU`,
            });
            break;
          }

          const layoutMethod = new LayoutClass(layoutCfg);
          layoutMethod.init({ nodes, edges });
          layoutMethod.executeWithWorker(canvas, this);
          break;
        }
        default:
          break;
      }
    }
    onmessage = event => {
      if (isLayoutMessage(event)) {
        handleLayoutMessage(event);
      }
    };
  }

  const layoutWorker = new WebWorker(workerCode, workerScirptURL);

  return layoutWorker;
};
