import * as MathUtil from './math';
import * as GraphicUtil from './graphic';
import * as PathUtil from './path';
import * as BaseUtil from './base';
import * as ColorUtil from './color';
import { ext, mat3 } from '@antv/matrix-util';

const transform = ext.transform;

const Util = { ...BaseUtil, ...GraphicUtil, ...PathUtil, ...MathUtil, ...ColorUtil, transform, mat3 };
export default Util;
