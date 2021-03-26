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
  it('tooltip fix to item', () => {
    data.nodes[0].x = 120;
    data.nodes[0].y = 20;
    data.nodes[1].x = 450;
    data.nodes[1].y = 450;
    const offsetX = 0 // 5 + 20; // 当前 canvas 的左侧元素宽度总和
    const offsetY = 0 // 162 + 20; // 当前 canvas 的上方元素高度总和
    const fixToNode = [1, 0.5];
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
      fixToNode,
      offsetX,
      offsetY,
      trigger: 'click'
    });

    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [tooltip],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
      },
    });

    graph.getContainer().style.backgroundColor = '#ccc'


    graph.data(data);
    graph.render();

    const tooltipPlugin = graph.get('plugins')[0];
    graph.emit('node:click', { item: graph.getNodes()[0] });
    const dom = tooltipPlugin.get('tooltip')
    expect(dom.style.visibility).toEqual('visible');

    const nodeBBox = graph.getNodes()[0].getBBox();
    const expectPoint = {
      x: nodeBBox.minX + nodeBBox.width * fixToNode[0],
      y: nodeBBox.minY + nodeBBox.height * fixToNode[1]
    }
    const expectCanvasXY = graph.getCanvasByPoint(expectPoint.x, expectPoint.y);
    const graphContainer = graph.getContainer();
    expectCanvasXY.x += graphContainer.offsetLeft + offsetX;
    expectCanvasXY.y += graphContainer.offsetTop + offsetY;

    expect(dom.style.left).toEqual(`${expectCanvasXY.x}px`)
    expect(dom.style.top).toEqual(`${expectCanvasXY.y}px`)

    graph.emit('canvas:click', { item: graph.getNodes()[0] });
    expect(dom.style.visibility).toEqual('hidden');

    console.log(graph.getNodes()[1].getModel().x, graph.getNodes()[1].getModel().y)
    graph.emit('node:click', { item: graph.getNodes()[1] });
    const nodeBBox2 = graph.getNodes()[0].getBBox();
    const expectPoint2 = {
      x: nodeBBox2.minX + nodeBBox2.width * fixToNode[0],
      y: nodeBBox2.minY + nodeBBox2.height * fixToNode[1]
    }
    const expectCanvasXY2 = graph.getCanvasByPoint(expectPoint2.x, expectPoint2.y);
    expectCanvasXY2.x += graphContainer.offsetLeft + offsetX;
    expectCanvasXY2.y += graphContainer.offsetTop + offsetY;
    
    // 此时超出了下边界和右边界
    const bbox = dom.getBoundingClientRect();
    expectCanvasXY2.x -= bbox.width + offsetX;
    expectCanvasXY2.y -= bbox.height + offsetY;

    // 由于测试界面图上方的 DOM 未渲染出来导致的误差，下面内容无法判断
    // expect(dom.style.left === `${expectCanvasXY2.x}px`).toEqual(true)
    // expect(dom.style.top === `${expectCanvasXY2.y}px`).toEqual(true)

    graph.destroy();
  });
});
