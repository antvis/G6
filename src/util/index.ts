import * as MathUtil from './math';
import * as GraphicUtil from './graphic';
import * as PathUtil from './path';
import * as BaseUtil from './base';
import * as LayoutUtil from './layout';
import { mat3, transform } from '@antv/matrix-util/lib';
import mix from '@antv/util/lib/mix';
import deepMix from '@antv/util/lib/deep-mix';

const Base = {
  mat3,
  mix,
  deepMix,
  transform,
};

const Util = Object.assign({}, Base, BaseUtil, GraphicUtil, PathUtil, MathUtil, LayoutUtil);
export default Util;
