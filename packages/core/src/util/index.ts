import * as MathUtil from './math';
import * as GraphicUtil from './graphic';
import * as PathUtil from './path';
import * as BaseUtil from './base';
import { ext, mat3 } from '@antv/matrix-util';

const transform = ext.transform;

const Util = { ...BaseUtil, ...GraphicUtil, ...PathUtil, ...MathUtil, transform, mat3 };
export default Util;
