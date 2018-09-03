/**
 * @fileOverview pull graph backbone
 * @author huangtonger@aliyun.com
 */

const G6 = require('@antv/g6');
const maxSpanningForest = require('./maxSpanningForest');
const Util = G6.Util;

const backbone = {
  maxSpanningForest
};
Util.mix(Util, backbone);
