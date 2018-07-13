/**
 * @fileOverview global config
 * @author huangtonger@aliyun.com
 */
const version = require('./version');

module.exports = {
  trackable: true,
  defaultNodeSize: 40,
  defaultGuideSize: 100,
  nodeStyle: {
    lineWidth: 1
  },
  guideStyle: {
  },
  labelStyle: {
    fill: '#595959',
    textAlign: 'center',
    textBaseline: 'middle'
  },
  groupStyle: {
    stroke: '#CED4D9',
    fill: '#F2F4F5',
    radius: 2
  },
  groupBackgroundPadding: [ 40, 10, 10, 10 ],
  updateDuration: 450,
  enterDuration: 450,
  leaveDuration: 450,
  updateEasing: 'easeQuadOut',
  enterEasing: 'easeQuadOut',
  leaveEasing: 'easeQuadOut',
  version
};
