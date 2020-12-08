/**
 * @fileOverview layout entry file
 * @author shiwu.wyy@antfin.com
 */

import { each } from '@antv/util';
import Layout from './layout';

import Circular from './circular';

const layouts = {
  circular: Circular,
};

// 注册布局
each(layouts, (layout, type: string) => {
  Layout.registerLayout(type, {}, layout);
});

export default Layout;
