import { generateTarget, parseXML, compareTwoTarget, xmlDataRenderer } from "../../../../src/shape/xml";
import G6 from "../../../../src";

const testXML = `
<group>
  <rect style={{
    width: 100, height: 20, fill: '#1890ff', stroke: '#1890ff', radius: [6, 6, 0, 0]
  }}>
    <text style={{ marginTop: 2, marginLeft: 50, textAlign: 'center', fontWeight: 'bold', fill: '#fff' }}>{{id}}</text>
  </rect>
<group>
`

const testXMLNode = cfg => `
<group>
  <rect style={{
    width: 100, height: 20, fill: '#1890ff', stroke: '#1890ff', radius: [6, 6, 0, 0]
}} keyshape="true" name="test">
    <text style={{ marginTop: 2, marginLeft: 50, textAlign: 'center', fontWeight: 'bold', fill: '#fff' }} name="title">${cfg.id}</text>
  </rect>
<group>
`

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
          }
        },
        nodeStateStyles: {
          'test': {
            title: {
              fill: '#eee'
            }
          }
        }
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
      console.log(target.children[0].bbox)
      expect(target.children[0].bbox.width).toBe(100);
      expect(target.children[0].children[0].bbox.x).toBe(50)

    })
  });

  describe('compare test', () => {
    const xmlText = xmlDataRenderer(testXML)({ id: 'node' });
    const xmlParser = document.createElement('div');
    xmlParser.innerHTML = xmlText;
    const xml = xmlParser.children[0] as HTMLElement;
    const target = generateTarget(parseXML(xml, {}));

    it('compare same', () => {
      const result = compareTwoTarget(target, target);
      expect(result.action).toBe('same')
    });

    it('compare add', () => {
      const result = compareTwoTarget(target, null);
      expect(result.action).toBe('add')
    });

    it('compare delete', () => {
      const result = compareTwoTarget(null, target);
      expect(result.action).toBe('delete')
    });

    it('compare restructure', () => {
      const result = compareTwoTarget(target.children[0], target);
      expect(result.action).toBe('restructure')
    });
  })
});
