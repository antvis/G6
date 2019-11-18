/**
 * @fileOverview layout entry file
 * @author shiwu.wyy@antfin.com
 */

const Layout = require('./layout');
module.exports = {
  Random: require('./random'),
  Mds: require('./mds'),
  Circular: require('./circular'),
  Fruchterman: require('./fruchterman'),
  Radial: require('./radial/radial'),
  Force: require('./force'),
  Dagre: require('./dagre'),
  Concentric: require('./concentric'),
  Grid: require('./grid'),
  FruchtermanGroup: require('./fruchterman-group')
};
module.exports = Layout;
