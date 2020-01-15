import * as MathUtil from './math';
import * as GraphicUtil from './graphic';
import * as PathUtil from './path';
import * as BaseUtil from './base';

const Util = Object.assign({}, BaseUtil, GraphicUtil, PathUtil, MathUtil);
export default Util;
