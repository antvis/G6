import * as MathUtil from './math';
import * as GraphicUtil from './graphic';
import * as PathUtil from './path';
import * as BaseUtil from './base';
import { uniqueId } from '@antv/util';

const Util = { ...BaseUtil, ...GraphicUtil, ...PathUtil, ...MathUtil, uniqueId };
export default Util;
