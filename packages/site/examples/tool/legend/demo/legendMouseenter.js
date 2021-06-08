import G6 from '@antv/g6'

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 50;
const el = document.createElement('pre');
el.innerHTML =
  'Hover the legend item to filter\n鼠标进入图例上的元素进行筛选';
container.appendChild(el);

const typeConfigs = {
  'type1': {
    type: 'circle',
    size: 5,
    style: {
      fill: '#5B8FF9'
    }
  },
  'type2': {
    type: 'circle',
    size: 20,
    style: {
      fill: '#5AD8A6'
    }
  },
  'type3': {
    type: 'rect',
    size: [10, 10],
    style: {
      fill: '#5D7092'
    }
  },
  'eType1': {
    type: 'line',
    style: {
      width: 20,
      stroke: '#F6BD16',
    }
  },
  'eType2': {
    type: 'cubic',
  },
  'eType3': {
    type: 'quadratic',
    style: {
      width: 25,
      stroke: '#6F5EF9'
    }
  }
}

const data = {
  nodes: [
    {
      id: '1',
      label: '1:type1',
      legendType: 'type1',
    },
    {
      id: '2',
      label: '2:type2',
      legendType: 'type2',
    },
    {
      id: '3',
      label: '3:type1',
      legendType: 'type1',
    },
    {
      id: '4',
      label: '4:type3',
      legendType: 'type3',
    },
  ],
  edges: [{
    source: '1',
    target: '2',
    legendType: 'eType1',
    label: '1->2:edge-type1',
  }, {
    source: '1',
    target: '4',
    legendType: 'eType3',
    label: '1->4:edge-type3'
  }, {
    source: '3',
    target: '4'
  }, {
    source: '2',
    target: '4',
    legendType: 'eType1',
    label: '2->4:edge-type1'
  }]
};

data.nodes.forEach(node => {
  if (!node.legendType) return;
  node = Object.assign(node, {...typeConfigs[node.legendType]});
})
data.edges.forEach(edge => {
  if (!edge.legendType) return;
  const config = typeConfigs[edge.legendType];
  edge = Object.assign(edge, {...config});
})

const legendData = {
  nodes: [{
    id: 'type1',
    label: 'node-type1',
    order: 4,
    ...typeConfigs['type1']
  }, {
    id: 'type2',
    label: 'node-type2',
    order: 0,
    ...typeConfigs['type2']
  }, {
    id: 'type3',
    label: 'node-type3',
    order: 2,
    ...typeConfigs['type3']
  }],
  edges: [{
    id: 'eType1',
    label: 'edge-type1',
    order: 2,
    ...typeConfigs['eType1']
  }, {
    id: 'eType2',
    label: 'edge-type2',
    ...typeConfigs['eType2']
  }, {
    id: 'eType3',
    label: 'edge-type3',
    ...typeConfigs['eType3']
  }]
}
const legend = new G6.Legend({
  data: legendData,
  align: 'center',
  layout: 'horizontal', // vertical
  position: 'bottom-right',
  vertiSep: 12,
  horiSep: 24,
  offsetY: -24,
  padding: [4, 16, 8, 16],
  containerStyle: {
    fill: '#ccc',
    lineWidth: 1
  },
  title: 'Legend',
  titleConfig: {
    position: 'center',
    offsetX: 0,
    offsetY: 12,
  },
  filter: {
    enable: true,
    trigger: 'mouseenter',
    graphActiveState: 'activeByLegend',
    graphInactiveState: 'inactiveByLegend',
    filterFunctions: {
      'type1': (d) => {
        if (d.legendType === 'type1') return true;
        return false
      },
      'type2': (d) => {
        if (d.legendType === 'type2') return true;
        return false
      },
      'type3': (d) => {
        if (d.legendType === 'type3') return true;
        return false
      },
      'eType1': (d) => {
        if (d.legendType === 'eType1') return true;
        return false
      },
      'eType2': (d) => {
        if (d.legendType === 'eType2') return true;
        return false
      },
      'eType3': (d) => {
        if (d.legendType === 'eType3') return true;
        return false
      },
    }
  }
});


const graph = new G6.Graph({
  // 使用 contextMenu plugins 时，需要将 container 设置为 position: relative;
  container: 'container',
  width,
  height,
  linkCenter: true,
  defaultNode: {
    labelCfg: {
      position: "bottom",
      style: {
        stroke: '#fff',
        lineWidth: 4
      }
    }
  },
  defaultEdge: {
    labelCfg: {
      autoRotate: true,
      style: {
        stroke: '#fff',
        lineWidth: 4
      }
    }
  },
  nodeStateStyles: {
    activeByLegend: {
      lineWidth: 10,
      strokeOpacity: 0.5
    },
    inactiveByLegend: {
      opacity: 0.5
    }
  },
  edgeStateStyles: {
    activeByLegend: {
      lineWidth: 3
    },
    inactiveByLegend: {
      opacity: 0.5
    }
  },
  plugins: [legend],
});

graph.data(data);
graph.render();

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };
