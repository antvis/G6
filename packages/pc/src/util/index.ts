import * as ColorUtil from './color';
import * as LayoutUtil from './layout';
import * as GpuUtil from './gpu';
import { Util } from '@antv/g6-core';

const G6Util = { ...Util, ...ColorUtil, ...LayoutUtil, ...GpuUtil } as any;

export default G6Util;
