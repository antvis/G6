import { Graph } from '@antv/g6';

/**
 * Inspired by https://graphcommons.com/graphs/be8bc972-5b26-4f5c-837d-a34704f33a9e
 */
fetch('https://assets.antv.antgroup.com/g6/unicorns-investors.json').then((res) => res.json()).then(data => {
  const size = (node) => Math.max(...node.style.size);

  const graph = new Graph({
    data,
    autoFit: 'view',
    node: {
      style: {
        fillOpacity: 1,
        label: true,
        labelText: (d) => d.data?.name,
        labelBackground: true,
        icon: true,
        iconText: (d) => (d.data?.type === 'Investor' ? '💰' : '🦄️'),
        fill: (d) => (d.data?.type === 'Investor' ? '#6495ED' : '#FFA07A'),
      },
      state: {
        inactive: {
          fillOpacity: 0.3,
          icon: false,
          label: false,
        },
      },
    },
    edge: {
      style: {
        label: false,
        labelText: (d) => d.data?.type,
        labelBackground: true,
      },
      state: {
        active: {
          label: true,
        },
        inactive: {
          strokeOpacity: 0,
        },
      },
    },
    layout: {
      type: 'd3-force',
      link: { distance: (edge) => size(edge.source) + size(edge.target) },
      collide: { radius: (node) => size(node) },
      manyBody: { strength: (node) => -4 * size(node) },
      animation: false,
    },
    transforms: [
      {
        type: 'map-node-size',
        scale: 'linear',
        maxSize: 60,
        minSize: 20,
        mapLabelSize: [12, 24]
      },
    ],
    behaviors: [
      'drag-canvas',
      'zoom-canvas',
      function () {
        return {
          key: 'hover-activate',
          type: 'hover-activate',
          enable: (e) => e.targetType === 'node',
          degree: 1,
          inactiveState: 'inactive',
          onHover: (e) => {
            this.frontElement(e.target.id);
            e.view.setCursor('pointer');
          },
          onHoverEnd: (e) => {
            e.view.setCursor('default');
          },
        };
      },
      {
        type: 'fix-element-size',
        enable: true,
      },
      'auto-adapt-label'
    ],
    animation: false,
  });

  graph.render();
})


const container = document.getElementById('container');
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML =
  'Network Map of 🦄 Unicorns and Their 💰Investors - 1086 nodes, 1247 edges';
container.appendChild(descriptionDiv);
