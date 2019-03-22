const Util = require('../util');
const Behavior = require('./behavior');
const behaviors = {
  'drag-canvas': require('./drag-canvas'),
  'zoom-canvas': require('./zoom-canvas'),
  'drag-node': require('./drag-node'),
  'click-select': require('./click-select'),
  tooltip: require('./tooltip'),
  'edge-tooltip': require('./edge-tooltip'),
  'collapse-expand': require('./collapse-expand')
};
Util.each(behaviors, (behavior, type) => {
  Behavior.registerBehavior(type, behavior);
});
module.exports = Behavior;
