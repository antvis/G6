/**
 * @fileOverview util
 * @author huangtonger@aliyun.com
 */

const Util = {};
const MathUtil = require('./math');
const PathUtil = require('./path');
const BaseUtil = require('./base');
const GraphicUtil = require('./graphic');
BaseUtil.deepMix(Util, BaseUtil, GraphicUtil, PathUtil, MathUtil);
module.exports = Util;
