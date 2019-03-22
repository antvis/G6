const Util = require('../../util');
const Group = require('@antv/g/lib').Group;

module.exports = Util.augment(Group, {
  findByClassName(className) {
    return this.find(function(shape) {
      return shape.get('className') === className;
    });
  }
});

