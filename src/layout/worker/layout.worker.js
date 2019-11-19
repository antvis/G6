/**
 * @fileoverview web worker for layout
 * @author changzhe.zb@antfin.com
 */
const Layout = require('..');
const layoutConst = require('./layoutConst');

const { LAYOUT_MESSAGE } = layoutConst;

function isLayoutMessage(event) {
  const { type } = event.data;
  return type === LAYOUT_MESSAGE.RUN;
}

function handleLayoutMessage(event) {
  const { type } = event.data;

  switch (type) {
    case LAYOUT_MESSAGE.RUN: {
      const { nodes, edges, layoutCfg = {} } = event.data;
      const { type: layoutType } = layoutCfg;
      const LayoutClass = Layout[layoutType];
      if (!LayoutClass) {
        postMessage({ type: LAYOUT_MESSAGE.ERROR, message: `layout ${layoutType} not found` });
        break;
      }

      const layoutMethod = new LayoutClass(layoutCfg);
      layoutMethod.init({ nodes, edges });
      layoutMethod.execute();
      postMessage({ type: LAYOUT_MESSAGE.END, nodes });
      layoutMethod.destroy();
      break;
    }
    default:
      break;
  }
}

// listen to message posted to web worker
self.onmessage = event => {
  if (isLayoutMessage(event)) {
    handleLayoutMessage(event);
  }
};
