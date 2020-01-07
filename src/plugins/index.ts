// const G6Plugins = {
//   Minimap: require('./minimap'),
//   Grid: require('./grid'),
//   Menu: require('./menu'),
//   Bundling: require('./bundling')
// };

// module.exports = G6Plugins;

import Grid from './grid'
import Menu from './menu'
import Minimap from './minimap'
import Bundling from './bundling'

export default {
  Menu,
  Grid,
  Minimap,
  Bundling
}