import * as MathUtil from './math';
import * as GraphicUtil from './graphic';
import * as PathUtil from './path';
import * as BaseUtil from './base';
import * as MatUtil from './mat';
import { transform } from '@antv/matrix-util';
import { uniqueId } from '@antv/util';

const mat3 = {
  ...MatUtil,
};

const Util = { ...BaseUtil, ...GraphicUtil, ...PathUtil, ...MathUtil, uniqueId, transform, mat3 };
export default Util;
