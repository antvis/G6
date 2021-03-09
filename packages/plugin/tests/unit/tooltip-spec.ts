import G6 from '@antv/g6';
import Tooltip from '../../src/tooltip';

const div = document.createElement('div');
div.id = 'tooltip-plugin';
document.body.appendChild(div);

const data = {
  nodes: [
    {
      id: 'node1',
      label: 'node1',
      x: 100,
      y: 100,
    },
    {
      id: 'node2',
      label: 'node2',
      x: 150,
      y: 300,
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};

describe('tooltip', () => {
  it('tooltip with default', () => {
    const tooltip = new Tooltip();

    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [tooltip],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
      },
      defaultNode: {
        type: 'rect',
      },
      defaultEdge: {
        style: {
          lineAppendWidth: 20,
        },
      },
    });

    graph.data(data);
    graph.render();

    const tooltipPlugin = graph.get('plugins')[0];
    expect(tooltipPlugin.get('offsetX')).toBe(6);
    expect(tooltipPlugin.get('tooltip').outerHTML).toBe(
      `<div class="g6-component-tooltip" style="position: absolute; visibility: hidden; display: none;"></div>`,
    );

    graph.emit('node:mouseenter', { item: graph.getNodes()[0] });
    expect(tooltipPlugin.get('tooltip').style.visibility).toEqual('visible');
    graph.emit('node:mouseleave', { item: graph.getNodes()[0] });
    expect(tooltipPlugin.get('tooltip').style.visibility).toEqual('hidden');

    graph.destroy();
  });
  it('tooltip with dom', () => {
    const tooltip = new Tooltip({
      offsetX: 10,
      getContent(e) {
        const outDiv = document.createElement('div');
        outDiv.style.width = '180px';
        outDiv.innerHTML = `
        <h4>自定义tooltip</h4>
        <ul>
          <li>Label: ${e.item.getModel().label || e.item.getModel().id}</li>
        </ul>`;
        return outDiv;
      },
    });
    expect(tooltip.get('offsetX')).toBe(10);

    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [tooltip],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
      },
      defaultEdge: {
        style: {
          lineAppendWidth: 20,
        },
      },
    });

    graph.data(data);
    graph.render();
    const tooltipPlugin = graph.get('plugins')[0];
    expect(tooltipPlugin.get('offsetX')).toBe(10);
    graph.destroy();
  });
  it('tooltip with string', () => {
    const tooltip = new Tooltip({
      getContent(e) {
        return `<div style='width: 180px;'>
          <ul id='menu'>
            <li title='1'>测试02</li>
            <li title='2'>测试02</li>
            <li>测试02</li>
            <li>测试02</li>
            <li>测试02</li>
          </ul>
        </div>`;
      },
    });

    expect(tooltip.get('offsetX')).toBe(6);
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [tooltip],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
      },
    });

    graph.data(data);
    graph.render();
    graph.destroy();
  });
});
