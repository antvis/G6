import * as ColorUtil from './color';
import * as LayoutUtil from './layout';
import * as GpuUtil from './gpu';
import * as ComboUtil from './combo-util';
import { Util } from '@antv/g6-core';

const G6Util = { ...Util, ...ColorUtil, ...LayoutUtil, ...GpuUtil, ...ComboUtil } as any;

export default G6Util;
