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
const AnimateUtil = require('./animate');
BaseUtil.mix(Util, BaseUtil, GraphUtil, GraphicUtil, DomUtil, PathUtil, MathUtil, AnimateUtil);
module.exports = Util;
