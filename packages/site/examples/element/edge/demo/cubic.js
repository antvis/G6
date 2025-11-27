import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const data = {
  nodes: [
    {
      id: 'node1',
    },
    {
      id: 'node2',
    },
    {
      id: 'node3',
    },
    {
      id: 'node4',
    },
    {
      id: 'node5',
    },
    {
      id: 'node6',
    },
  ],
  edges: [
    {
      id: 'line-default',
      source: 'node1',
      target: 'node2',
    },
    {
      id: 'line-active',
      source: 'node1',
      target: 'node3',
      states: ['active'],
    },
    {
      id: 'line-selected',
      source: 'node1',
      target: 'node4',
      states: ['selected'],
    },
    {
      id: 'line-highlight',
      source: 'node1',
      target: 'node5',
      states: ['highlight'],
    },
    {
      id: 'line-inactive',
      source: 'node1',
      target: 'node6',
      states: ['inactive'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  edge: {
    type: 'cubic',
    style: {
      labelText: (d) => d.id,
      labelBackground: true,
      endArrow: true,
      badge: true,
      badgeText: '\ue603',
      badgeFontFamily: 'iconfont',
      badgeBackgroundWidth: 12,
      badgeBackgroundHeight: 12,
    },
  },
  layout: {
    type: 'radial',
    unitRadius: 220,
    linkDistance: 220,
  },
});

graph.render();
