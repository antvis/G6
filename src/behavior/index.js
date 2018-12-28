const Util = require('../util');
const Behavior = require('./behavior');
const behaviors = {
  'drag-canvas': require('./drag-canvas'),
  'zoom-canvas': require('./zoom-canvas')
};
Util.each(behaviors, (behavior, type) => {
  Behavior.registerBehavior(type, behavior);
});
module.exports = Behavior;
