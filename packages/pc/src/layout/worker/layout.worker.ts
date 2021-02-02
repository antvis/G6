// /**
//  * @fileoverview web worker for layout
//  * @author changzhe.zb@antfin.com
//  */
// import { LAYOUT_MESSAGE } from './layoutConst';
// import { getLayoutByName } from '@antv/layout';

// interface Event {
//   type: string;
//   data: any;
// }

// const ctx: Worker = self as any;

// function isLayoutMessage(event: Event) {
//   const { type } = event.data;
//   return type === LAYOUT_MESSAGE.RUN || type === LAYOUT_MESSAGE.GPURUN;
// }

// function handleLayoutMessage(event: Event) {
//   const { type } = event.data;

//   switch (type) {
//     case LAYOUT_MESSAGE.RUN: {
//       const { nodes, edges, layoutCfg = {} } = event.data;
//       const { type: layoutType } = layoutCfg;
//       const LayoutClass = getLayoutByName(layoutType);
//       if (!LayoutClass) {
//         ctx.postMessage({ type: LAYOUT_MESSAGE.ERROR, message: `layout ${layoutType} not found` });
//         break;
//       }

//       const layoutMethod = new LayoutClass(layoutCfg);
//       layoutMethod.init({ nodes, edges });
//       layoutMethod.execute();
//       ctx.postMessage({ type: LAYOUT_MESSAGE.END, nodes });
//       layoutMethod.destroy();
//       break;
//     }

//     case LAYOUT_MESSAGE.GPURUN: {
//       const { nodes, edges, layoutCfg = {}, canvas } = event.data;

//       const { type: layoutType } = layoutCfg;

//       const LayoutClass = getLayoutByName(layoutType);
//       if (!LayoutClass) {
//         ctx.postMessage({ type: LAYOUT_MESSAGE.ERROR, message: `layout ${layoutType} not found` });
//         break;
//       }
//       if (layoutType.split('-')[1] !== 'gpu') {
//         ctx.postMessage({
//           type: LAYOUT_MESSAGE.ERROR,
//           message: `layout ${layoutType} does not support GPU`,
//         });
//         break;
//       }

//       const layoutMethod = new LayoutClass(layoutCfg);
//       layoutMethod.init({ nodes, edges });
//       layoutMethod.executeWithWorker(canvas, ctx);
//       break;
//     }
//     default:
//       break;
//   }
// }

// // listen to message posted to web worker
// ctx.onmessage = (event: Event) => {
//   if (isLayoutMessage(event)) {
//     handleLayoutMessage(event);
//   }
// };

// // https://stackoverflow.com/questions/50210416/webpack-worker-loader-fails-to-compile-typescript-worker
// export default null as any;

// 简单示例
export const work = () => {
  // 类似 ctx.onmessage
  onmessage = (e) => {
    console.log(e.data);
  };
};
