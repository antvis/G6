import * as MathUtil from './math';
import * as GraphicUtil from './graphic';
import * as PathUtil from './path';
import * as BaseUtil from './base';

const Util = { ...BaseUtil, ...GraphicUtil, ...PathUtil, ...MathUtil };
export default Util;
