/**
 * @fileOverview layout entry file
 * @author shiwu.wyy@antfin.com
 */

import Layout from './layout';

import Circular from './circular';
import Concentric from './concentric';
import Dagre from './dagre';
import Force from './force';
import Fruchterman from './fruchterman';
import FruchtermanGroup from './fruchterman-group';
import Grid from './grid';
import MDS from './mds';
import Radial from './radial/radial';
import Random from './random';

// 注册布局  TODO: 考虑让用户手动注册以 treeshaking？
Layout.registerLayout('circular', Circular);
Layout.registerLayout('concentric', Concentric);
Layout.registerLayout('dagre', Dagre);
Layout.registerLayout('force', Force);
Layout.registerLayout('fruchterman', Fruchterman);
Layout.registerLayout('fruchtermanGroup', FruchtermanGroup);
Layout.registerLayout('grid', Grid);
Layout.registerLayout('mds', MDS);
Layout.registerLayout('radial', Radial);
Layout.registerLayout('random', Random);

export default Layout;
