/**
 * @fileoverview web worker for layout
 * @author changzhe.zb@antfin.com
 */
import Layout from '../layout';
import { LAYOUT_MESSAGE } from './layoutConst';

interface Event {
  type: string;
  data: any;
}

export default class LayoutWorker {
  public static isLayoutMessage(event: Event) {
    const { type } = event.data;
    return type === LAYOUT_MESSAGE.RUN;
  }

  public static handleLayoutMessage(event: Event) {
    const { type } = event.data;

    switch (type) {
      case LAYOUT_MESSAGE.RUN: {
        const { nodes, edges, layoutCfg = {} } = event.data;
        const { type: layoutType } = layoutCfg;
        const LayoutClass = Layout[layoutType];
        if (!LayoutClass) {
          postMessage({ type: LAYOUT_MESSAGE.ERROR, message: `layout ${layoutType} not found` }, '/');
          break;
        }

        const layoutMethod = new LayoutClass(layoutCfg);
        layoutMethod.init({ nodes, edges });
        layoutMethod.execute();
        postMessage({ type: LAYOUT_MESSAGE.END, nodes }, '/');
        layoutMethod.destroy();
        break;
      }
      default:
        break;
    }
  }
}

// listen to message posted to web worker
self.onmessage = (event: Event) => {
  if (LayoutWorker.isLayoutMessage(event)) {
    LayoutWorker.handleLayoutMessage(event);
  }
};
