import {
  generateTarget,
  parseXML,
  compareTwoTarget,
  xmlDataRenderer,
} from '../../../../src/shape/xml';
import G6 from '../../../../src';

const testXML = `
<group>
  <rect style={{
    width: 100, height: 20, fill: '#1890ff', stroke: '#1890ff', radius: [6, 6, 0, 0]
  }}>
    <text style={{ marginTop: 2, marginLeft: 50, textAlign: 'center', fontWeight: 'bold', fill: '#fff' }}>{{id}}</text>
  </rect>
<group>
`;

const testXMLNode = (cfg) => `
<group>
  <rect style={{
    width: 100, height: 20, fill: '#1890ff', stroke: '#1890ff', radius: [6, 6, 0, 0]
}} keyshape="true" name="test">
    <text style={{ marginTop: 2, marginLeft: 50, textAlign: 'center', fontWeight: 'bold', fill: '#fff' }} name="title">${cfg.id}</text>
  </rect>
<group>
`;

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('xml node test', () => {
  describe('registerTest', () => {
    it('register test', () => {
      G6.registerNode('test', testXMLNode);
      const graph = new G6.Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'test',
          style: {
            lineWidth: 4,
          },
        },
        nodeStateStyles: {
          test: {
            title: {
              fill: '#eee',
            },
          },
        },
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'test',
            x: 100,
            y: 100,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const group = node.get('group');
      expect(group.getCount()).toEqual(2);
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('fill')).toEqual('#1890ff');
      expect(keyShape.attr('lineWidth')).toEqual(4);
      expect(keyShape.get('name')).toBe('test');
      graph.setItemState(node, 'test', true);
      const afterNode = graph.getNodes()[0];
      const afterGroup = afterNode.get('group');
      expect(afterGroup.get('children')[1].attr('fill')).toBe('#eee');

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });

  describe('parse test', () => {
    it('xml to object', () => {
      const xmlText = xmlDataRenderer(testXML)({ id: 'node' });
      const xmlParser = document.createElement('div');
      xmlParser.innerHTML = xmlText;
      const xml = xmlParser.children[0] as HTMLElement;
      const obj = parseXML(xml, {});
      expect(obj.type).toBe('group');
      expect(obj.children[0].type).toBe('rect');
      expect(obj.children[0].attrs.stroke).toBe('#1890ff');
      expect(obj.children[0].children[0].attrs.text).toBe('node');
    });

    it('object generate target', () => {
      const xmlText = xmlDataRenderer(testXML)({ id: 'node' });
      const xmlParser = document.createElement('div');
      xmlParser.innerHTML = xmlText;
      const xml = xmlParser.children[0] as HTMLElement;
      const target = generateTarget(parseXML(xml, {}));

      expect(target.bbox.x).toBe(0);
      expect(target.bbox.y).toBe(0);
      expect(target.children[0].bbox.width).toBe(100);
      expect(target.children[0].children[0].bbox.x).toBe(50);
    });
  });

  describe('compare test', () => {
    const xmlText = xmlDataRenderer(testXML)({ id: 'node' });
    const xmlParser = document.createElement('div');
    xmlParser.innerHTML = xmlText;
    const xml = xmlParser.children[0] as HTMLElement;
    const target = generateTarget(parseXML(xml, {}));

    it('compare same', () => {
      const result = compareTwoTarget(target, target);
      expect(result.action).toBe('same');
    });

    it('compare add', () => {
      const result = compareTwoTarget(target, null);
      expect(result.action).toBe('add');
    });

    it('compare delete', () => {
      const result = compareTwoTarget(null, target);
      expect(result.action).toBe('delete');
    });

    it('compare restructure', () => {
      const result = compareTwoTarget(target.children[0], target);
      expect(result.action).toBe('restructure');
    });
  });

  describe.only('xml node state', () => {
    G6.registerNode('xml-node', (cfg) => {
      return `
        <group>
          <circle keyshape='true' style={{
            x: 0,
            y: 0,
            r: ${cfg.size || 6},
            stroke: ${cfg.style.stroke},
            fill: ${cfg.style.fill}
          }}>
            <polygon style={{
              points: [[10, 10], [15, 20], [20, 40], [30, 90]],
              fill: '#F6BD16',
              stroke: 'green'
            }}></polygon>
            <circle style={{
              x: 10, 
              y: 20,
              r: 15,
              stroke: 'yellow',
              fill: '#000'
            }} name='icon-circle' draggable='true'>
            </circle>
          </circle>
          <text style={{ marginTop: -140, textAlign: 'center', fontWeight: 'bold', fill: 'green' }}>${
            cfg.label || cfg.id
          }</text>
        </group>
      `;
    });
    const data = {
      nodes: [
        {
          id: 'node1',
          label: 'node1',
          x: 100,
          y: 100,
        },
      ],
    };
    it('node state', () => {
      const graph = new G6.Graph({
        container: 'graph-spec',
        width: 500,
        height: 500,
        modes: {
          default: ['drag-node', 'zoom-canvas'],
        },
        defaultNode: {
          type: 'xml-node',
          size: 50,
          style: {
            stroke: 'blue',
            fill: '#ccc',
          },
        },
        nodeStateStyles: {
          hover: {
            // fill: 'red',
            // stroke: 'green',
            // lineWidth: 3,
            'icon-circle': {
              fill: '#456dc5',
            },
          },
        },
      });

      graph.data(data);
      graph.render();

      graph.on('icon-circle:mouseenter', (evt) => {
        graph.setItemState(evt.item, 'hover', true);
      });

      graph.on('icon-circle:mouseleave', (evt) => {
        graph.setItemState(evt.item, 'hover', false);
      });
    });
  });
});
