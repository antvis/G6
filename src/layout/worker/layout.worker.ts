/**
 * @fileoverview web worker for layout
 * @author changzhe.zb@antfin.com
 */
import Layout from '../index';
import { LAYOUT_MESSAGE } from './layoutConst';

interface Event {
  type: string;
  data: any;
}

const ctx: Worker = self as any;

function isLayoutMessage(event: Event) {
  const { type } = event.data;
  return type === LAYOUT_MESSAGE.RUN;
}

function handleLayoutMessage(event: Event) {
  const { type } = event.data;

  switch (type) {
    case LAYOUT_MESSAGE.RUN: {
      const { nodes, edges, layoutCfg = {} } = event.data;
      const { type: layoutType } = layoutCfg;
      const LayoutClass = Layout[layoutType];
      if (!LayoutClass) {
        ctx.postMessage({ type: LAYOUT_MESSAGE.ERROR, message: `layout ${layoutType} not found` });
        break;
      }

      const layoutMethod = new LayoutClass(layoutCfg);
      layoutMethod.init({ nodes, edges });
      layoutMethod.execute();
      ctx.postMessage({ type: LAYOUT_MESSAGE.END, nodes });
      layoutMethod.destroy();
      break;
    }
    default:
      break;
  }
}

// listen to message posted to web worker
ctx.onmessage = (event: Event) => {
  if (isLayoutMessage(event)) {
    handleLayoutMessage(event);
  }
};

// https://stackoverflow.com/questions/50210416/webpack-worker-loader-fails-to-compile-typescript-worker
export default ctx;
