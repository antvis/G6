// const expect = require('chai').expect;
// const G = require('@antv/g');
// const div = document.createElement('div');
// require('../../../../src/extend/g/group');
// const RootGroup = require('../../../../src/extend/g/root-group');

// div.id = 'extend-root-group-spec';
// document.body.appendChild(div);
// describe('freeze size group test', () => {
//   const canvas = new G.Canvas({
//     containerDOM: div
//   });
//   const rootGroup = canvas.addGroup(RootGroup);
//   const rectAttrs = {
//     x: 0,
//     y: 0,
//     width: 100,
//     heigth: 100,
//     fill: 'red'
//   };
//   const rect = rootGroup.addShape('rect', {
//     attrs: rectAttrs,
//     freezePoint: {
//       x: 0,
//       y: 0
//     }
//   });
//   rootGroup.scale(2, 2);
//   it('drawInner', () => {
//     expect(rect.getMatrix()).eqls([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);
//     canvas.draw();
//     expect(rect.getMatrix()).eqls([ 0.5, 0, 0, 0, 0.5, 0, 0, 0, 1 ]);
//   });
//   it('destroy test canvas', () => {
//     canvas.destroy();
//   });
// });
