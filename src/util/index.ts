import * as MathUtil from './math';
import * as GraphicUtil from './graphic';
import * as PathUtil from './path';
import * as BaseUtil from './base';
import * as ColorUtil from './color';
import { mat3, transform } from '@antv/matrix-util/lib';
import mix from '@antv/util/lib/mix';
import deepMix from '@antv/util/lib/deep-mix';
import isArray from '@antv/util/lib/is-array';
import isNumber from '@antv/util/lib/is-number';
import { uniqueId } from '@antv/util';

const Base = {
  mat3,
  mix,
  deepMix,
  transform,
  isArray,
  isNumber,
  uniqueId
};

const Util = { ...Base, ...BaseUtil, ...GraphicUtil, ...PathUtil, ...MathUtil, ...ColorUtil };
export default Util;
