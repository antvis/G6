import { Graph, Util } from '@antv/g6';
import insertCss from 'insert-css';

insertCss(`
  .g6-minimap-container {
    border: 1px solid #e2e2e2;
  }
  .g6-minimap-viewport {
    border: 2px solid rgb(25, 128, 255);
  }
`);


const container = document.getElementById('container');
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 110;
const data = Util.mock(20).random();
/** minimap with string config */
const minimap1 = 'minimap';
/** minimap with object onfig and delegate type */
const minimap2 =  {
  key: 'minimap2',
  type: 'minimap',
  size: [200, 200],
  mode: 'delegate',
  delegateStyle: {
    fill: 'red',
  },
}
/** minimap with object onfig and keyShape type */
const minimap3 = {
  key: 'minimap3',
  type: 'minimap',
  mode: 'keyShape',
  size: [200, 300],
};
new Graph({
  container,
  width,
  height,
  data,
  layout:{
    type:'force',
  },
  node: {
    labelShape: {
      text: {
        fields: ['id'],
        formatter: (model) => {
          return model.id;
        },
      },
    },
  },
  modes: {
    default: ['brush-select',"zoom-canvas","activate-relations","drag-canvas","drag-node"],
  },
  plugins:[minimap1,minimap2,minimap3],
})
 
