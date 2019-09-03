/*
 * @Author: moyee
 * @Date: 2019-06-27 18:12:06
 * @LastEditors: moyee
 * @LastEditTime: 2019-08-22 14:50:44
 * @Description: file content
 */
const Util = require('../util');
const Behavior = require('./behavior');
const behaviors = {
  'drag-canvas': require('./drag-canvas'),
  'zoom-canvas': require('./zoom-canvas'),
  'drag-node': require('./drag-node'),
  'click-select': require('./click-select'),
  tooltip: require('./tooltip'),
  'edge-tooltip': require('./edge-tooltip'),
  'collapse-expand': require('./collapse-expand'),
  'activate-relations': require('./activate-relations'),
  'brush-select': require('./brush-select'),
  'drag-group': require('./drag-group'),
  'drag-node-with-group': require('./drag-node-with-group'),
  'collapse-expand-group': require('./collapse-expand-group')
};
Util.each(behaviors, (behavior, type) => {
  Behavior.registerBehavior(type, behavior);
});
module.exports = Behavior;
