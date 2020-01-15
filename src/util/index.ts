import * as MathUtil from './math';
import * as GraphicUtil from './graphic';
import * as PathUtil from './path';
import * as BaseUtil from './base';
import Base from './base';

const Util = Object.assign({}, Base, BaseUtil, GraphicUtil, PathUtil, MathUtil);
export default Util;
