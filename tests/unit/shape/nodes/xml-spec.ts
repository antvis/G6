import { generateTarget, parseXML, compareTwoTarget } from "../../../../src/shape/xml";
import G6 from "../../../../src";

const testXML = `
<group>
  <rect style="{
    width: 100, height: 20, fill: '#1890ff', stroke: '#1890ff', radius: [6, 6, 0, 0]
  }">
    <text style="{ marginTop: 2, marginLeft: 50, textAlign: 'center', fontWeight: 'bold', fill: '#fff' }">id</text>
  </rect>
<group>
`

const testXMLNode = cfg => `
<group>
  <rect style="{
    width: 100, height: 20, fill: '#1890ff', stroke: '#1890ff', radius: [6, 6, 0, 0]
  }" keyshape="true" class-name="rect">
    <text style="{ marginTop: 2, marginLeft: 50, textAlign: 'center', fontWeight: 'bold', fill: '#fff' }">${cfg.id}</text>
  </rect>
<group>
`

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

const str2El = xml => {
  const el = document.createElement('div');
  el.innerHTML = xml;
  return el.children[0] as HTMLElement;
}

describe('xml node test', () => {
  const el = str2El(testXML);

  describe('registerTest', () => {
    it('register test', () => {
      G6.registerNode('test', testXMLNode);
      const graph = new G6.Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'test',
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
      expect(keyShape.get('className')).toBe('rect');

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });


  describe('parse test', () => {
    it('xml to object', () => {
      const obj = parseXML(el);
      expect(obj.type).toBe('group');
      expect(obj.children[0].type).toBe('rect');
      expect(obj.children[0].attrs.stroke).toBe('#1890ff');
      expect(obj.children[0].children[0].attrs.text).toBe('id');
    });

    it('object generate target', () => {
      const target = generateTarget(parseXML(el));

      expect(target.bbox.x).toBe(0);
      expect(target.bbox.y).toBe(0);
      expect(target.children[0].bbox.width).toBe(100);
      expect(target.children[0].children[0].bbox.x).toBe(50)

    })
  });

  describe('compare test', () => {
    const target = generateTarget(parseXML(el));

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
