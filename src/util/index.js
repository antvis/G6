/**
 * @fileOverview util
 * @author huangtonger@aliyun.com
 */

const Util = {};
const MathUtil = require('./math');
const PathUtil = require('./path');
const BaseUtil = require('./base');
const DomUtil = require('./dom');
const GraphUtil = require('./graph');
const GraphicUtil = require('./graphic');
BaseUtil.mix(Util, BaseUtil, GraphUtil, GraphicUtil, DomUtil, PathUtil, MathUtil);
module.exports = Util;
