const Util = require('../util');
const Behavior = require('./behavior');
const behaviors = {
  'drag-canvas': require('./drag-canvas')
};
Util.each(behaviors, (behavior, type) => {
  Behavior.registerBehavior(type, behavior);
});
module.exports = Behavior;
