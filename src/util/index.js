/**
 * @fileOverview util
 * @author huangtonger@aliyun.com
 */

const Util = {};
const MathUtil = require('./math');
const PathUtil = require('./path');
const BaseUtil = require('./base');
const GraphicUtil = require('./graphic');
const GroupUtil = require('./groupData');
const TextUtil = require('./text');
BaseUtil.deepMix(Util, BaseUtil, GraphicUtil, PathUtil, MathUtil, GroupUtil, TextUtil);
module.exports = Util;
