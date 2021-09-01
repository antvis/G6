import { Canvas, Group, Circle } from '@antv/g';
// import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import '../../../src/element/node';
import '../../../src/element/nodes';
import '../../../src/element/edge';
import '../../../src/behavior';
import Shape from '../../../src/element/shape';
import Graph from '../implement-graph';

const div = document.createElement('div');
div.id = 'edge-shape';
document.body.appendChild(div);

// const canvasRenderer = new CanvasRenderer();
const svgRenderer = new SVGRenderer();

const canvas = new Canvas({
  container: 'edge-shape',
  width: 600,
  height: 600,
  // renderer: canvasRenderer,
  renderer: svgRenderer,
});

describe('shape edge test', () => {
  describe('basic method test', () => {
    it('get factory', () => {
      const factory = Shape.getFactory('edge');
      expect(factory).not.toEqual(undefined);
    });
    it('get default', () => {
      const factory = Shape.getFactory('edge');
      const shape = factory.getShape();
      expect(shape.type).toEqual('line');
    });
  });

  describe('line test', () => {
    const factory = Shape.getFactory('edge');
    it('line without label', () => {
      const group = new Group();
      canvas.appendChild(group);
      const shape = factory.draw(
        'line',
        {
          startPoint: { x: 50, y: 50 },
          endPoint: { x: 100, y: 100 },
          color: 'red',
        },
        group,
      );
      canvas.render();
      const path = shape.attr('path');
      expect(shape.attr('stroke')).toEqual('red');
      expect(path.length).toEqual(2);
      expect(path[0]).toEqual(['M', 50, 50]);
      expect(group.getCount()).toEqual(1);
    });

    // TODO: G中原有的getStartTangent缺失
    it('line with label', () => {
      const group = new Group();
      canvas.appendChild(group);
      const shape = factory.draw(
        'line',
        {
          startPoint: { x: 150, y: 50 },
          endPoint: { x: 100, y: 100 },
          color: 'blue',
          label: '这是一条线',
        },
        group,
      );

      expect(shape.attr('path').length).toEqual(2);
      // const label = group.children[1];
      const label = group.getChildren()[1];
      expect(shape.attr('path').length).toEqual(2);
      expect(label.attr('x')).toEqual((100 + 150) / 2);
      expect(label.attr('y')).toEqual((100 + 50) / 2);
      expect(group.getCount()).toEqual(2);

      const item = {
        getContainer() {
          return group;
        },
        get() {
          return '';
        },
      };
      factory.baseUpdate(
        'shape',
        {
          startPoint: { x: 150, y: 50 },
          endPoint: { x: 100, y: 100 },
          color: 'blue',
          label: '这是一条线',
          labelCfg: {
            position: 'start',
          },
        },
        item,
      );
      canvas.render();
      expect(label.attr('x')).toEqual(150);
      expect(label.attr('y')).toEqual(50);
      factory.baseUpdate(
        'shape',
        {
          startPoint: { x: 150, y: 50 },
          endPoint: { x: 100, y: 100 },
          color: 'blue',
          label: '这是一条线',

          labelCfg: {
            position: 'end',
          },
        },
        item,
      );
      canvas.render();
      expect(label.attr('x')).toEqual(100);
      expect(label.attr('y')).toEqual(100);
    });


    it('line with overlapped nodes and label', () => {
      const group = new Group();
      canvas.appendChild(group);
      const shape = factory.draw(
        'line',
        {
          startPoint: { x: 150, y: 150 },
          endPoint: { x: 150, y: 150 },
          color: 'blue',
          label: '这是一条线',
        },
        group,
      );

      expect(shape.attr('path').length).toEqual(2);
      const label = group.getChildren()[1];
      expect(shape.attr('path').length).toEqual(2);
      expect(label.attr('x')).toEqual(150);
      expect(label.attr('y')).toEqual(150);
      expect(group.getCount()).toEqual(2);
      canvas.render();
    });

    // TODO: 未更新，且位置有偏移
    it('update points', () => {
      const group = new Group();
      canvas.appendChild(group);
      const shape = factory.draw(
        'line',
        {
          startPoint: { x: 200, y: 200 },
          endPoint: { x: 150, y: 100 },
          color: 'yellow',
          label: '这是另一条线',
        },
        group,
      );
      expect(shape.attr('path')[0]).toEqual(['M', 200, 200]);
      expect(group.getCount()).toEqual(2);
      const item = {
        getContainer() {
          return group;
        },
        get() {
          return '';
        },
      };
      canvas.render();
      factory.baseUpdate(
        'line',
        {
          startPoint: { x: 300, y: 300 },
          endPoint: { x: 250, y: 200 },
          color: 'pink',
          label: '这是不是另一条线',
        },
        item,
      );

      expect(shape.attr('path')[0]).toEqual(['M', 300, 300]);
      const label = group.getChildren()[1];
      expect(label.attr('x')).toEqual((300 + 250) / 2);
      expect(label.attr('y')).toEqual((300 + 200) / 2);

      canvas.render();
    });

    // TODO: 更新没有起作用，其余正常
    it('quadratic', () => {
      const group = new Group();
      canvas.appendChild(group);
      const shape = factory.draw(
        'quadratic',
        {
          startPoint: { x: 200, y: 200 },
          endPoint: { x: 150, y: 100 },
          controlPoints: [{ x: 220, y: 160 }],
          color: 'green',
          label: '这是一条曲线',
        },
        group,
      );
      const path = shape.attr('path');
      expect(path.length).toEqual(2);
      expect(path[1]).toEqual(['Q', 220, 160, 150, 100]);

      const group1 = new Group();
      canvas.appendChild(group1);
      const shape1 = factory.draw(
        'quadratic',
        {
          startPoint: { x: 200, y: 200 },
          endPoint: { x: 100, y: 100 },
          color: 'red',
          label: 'xxxx',
          labelCfg: {
            autoRotate: true,
          },
        },
        group1,
      );
      expect(shape1.attr('path').length).toEqual(2);
      const sqrt2 = Math.sqrt(2);
      expect(shape1.attr('path')[1]).toEqual([
        'Q',
        150 - (20 * sqrt2) / 2,
        150 + (20 * sqrt2) / 2,
        100,
        100,
      ]);
      canvas.render();

      // update with control points
      const item = {
        getContainer() {
          return group1;
        },
        get() {
          return '';
        },
      };
      factory.baseUpdate(
        'quadratic',
        {
          startPoint: { x: 300, y: 300 },
          endPoint: { x: 250, y: 200 },
          controlPoints: { x: 350, y: 350 },
          color: 'pink',
          label: '这是不是另一条线',
        },
        item,
      );
    });

    it('cubic', () => {
      const group = new Group();
      canvas.appendChild(group);
      const shape = factory.draw(
        'cubic',
        {
          startPoint: { x: 200, y: 200 },
          endPoint: { x: 150, y: 100 },
          controlPoints: [
            { x: 220, y: 200 },
            { x: 170, y: 100 },
          ],
          color: 'red',
        },
        group,
      );
      const path = shape.attr('path');
      expect(path.length).toEqual(2);
      expect(path[1]).toEqual(['C', 220, 200, 170, 100, 150, 100]);

      const shape1 = factory.draw(
        'cubic',
        {
          startPoint: { x: 200, y: 200 },
          endPoint: { x: 150, y: 100 },
          color: 'blue',
        },
        group,
      );
      expect(shape1.attr('path').length).toEqual(2);
      canvas.render();
    });

    it('cubic vertical', () => {
      const group = new Group();
      canvas.appendChild(group);
      const shape = factory.draw(
        'cubic-vertical',
        {
          startPoint: { x: 0, y: 0 },
          endPoint: { x: 150, y: 150 },
          color: 'red',
        },
        group,
      );

      expect(shape.attr('path')[1]).toEqual(['C', 0, 75, 150, 75, 150, 150]);
      canvas.render();
    });

    it('cubic horizontal', () => {
      const group = new Group();
      canvas.appendChild(group);
      const shape = factory.draw(
        'cubic-horizontal',
        {
          startPoint: { x: 0, y: 0 },
          endPoint: { x: 150, y: 150 },
          color: 'red',
        },
        group,
      );

      expect(shape.attr('path')[1]).toEqual(['C', 75, 0, 75, 150, 150, 150]);
      canvas.render();
    });

    it('arc', () => {
      const group = new Group();
      canvas.appendChild(group);
      const shape = factory.draw(
        'arc',
        {
          startPoint: { x: 0, y: 0 },
          endPoint: { x: 150, y: 150 },
          color: 'red',
          curveOffset: 10,
        },
        group,
      );
      expect(shape.attr('path')[1]).toEqual([
        'A',
        567.4999999999995,
        567.4999999999995,
        0,
        0,
        1,
        150,
        150,
      ]);

      // update curveOffset to nagtive
      const item = {
        getContainer() {
          return group;
        },
        get() {
          return '';
        },
      };
      factory.baseUpdate(
        'arc',
        {
          startPoint: { x: 0, y: 0 },
          endPoint: { x: 150, y: 150 },
          curveOffset: -10,
        },
        item,
      );
      expect(shape.attr('path')[1]).toEqual([
        'A',
        567.4999999999995,
        567.4999999999995,
        0,
        0,
        0,
        150,
        150,
      ]);

      // update to add controlpoints
      factory.baseUpdate(
        'arc',
        {
          startPoint: { x: 50, y: 50 },
          endPoint: { x: 200, y: 200 },
          controlPoints: [{ x: 150, y: 250 }],
        },
        item,
      );
      expect(shape.attr('path')[1]).toEqual([
        'A',
        111.80339887498948,
        111.80339887498948,
        0,
        0,
        0,
        200,
        200,
      ]);

      // update with controlpoints and different clockwise
      factory.baseUpdate(
        'arc',
        {
          startPoint: { x: 50, y: 50 },
          endPoint: { x: 200, y: 200 },
          controlPoints: [{ x: 100, y: 180 }],
        },
        item,
      );
      expect(shape.attr('path')[1]).toEqual([
        'A',
        125.54879529489719,
        125.54879529489719,
        0,
        0,
        1,
        200,
        200,
      ]);

      // update with controlpoints and different clockwise
      factory.baseUpdate(
        'arc',
        {
          startPoint: { x: 50, y: 200 },
          endPoint: { x: 200, y: 50 },
          controlPoints: [{ x: 150, y: 250 }],
        },
        item,
      );
      expect(shape.attr('path')[1]).toEqual([
        'A',
        108.65337342004415,
        108.65337342004415,
        0,
        0,
        1,
        200,
        50,
      ]);

      // update with controlpoints and different clockwise
      factory.baseUpdate(
        'arc',
        {
          startPoint: { x: 200, y: 200 },
          endPoint: { x: 50, y: 50 },
          controlPoints: [{ x: 100, y: 180 }],
        },
        item,
      );
      expect(shape.attr('path')[1]).toEqual([
        'A',
        125.54879529489719,
        125.54879529489719,
        0,
        0,
        1,
        50,
        50,
      ]);

      // update with controlpoints and different clockwise
      factory.baseUpdate(
        'arc',
        {
          startPoint: { x: 200, y: 50 },
          endPoint: { x: 50, y: 200 },
          controlPoints: [{ x: 100, y: 180 }],
        },
        item,
      );
      expect(shape.attr('path')[1]).toEqual([
        'A',
        208.17994353176505,
        208.17994353176505,
        0,
        0,
        0,
        50,
        200,
      ]);

      // update with controlpoints and different clockwise
      factory.baseUpdate(
        'arc',
        {
          startPoint: { x: 200, y: 200 },
          endPoint: { x: 50, y: 50 },
          controlPoints: [{ x: 100, y: 180 }],
        },
        item,
      );
      expect(shape.attr('path')[1]).toEqual([
        'A',
        125.54879529489719,
        125.54879529489719,
        0,
        0,
        1,
        50,
        50,
      ]);

      // update with controlpoint to on the same line of start and end, cannot generate a circle, but a line
      factory.baseUpdate(
        'arc',
        {
          startPoint: { x: 200, y: 200 },
          endPoint: { x: 50, y: 50 },
          controlPoints: [{ x: 100, y: 100 }],
        },
        item,
      );
      expect(shape.attr('path')[1]).toEqual(['L', 50, 50]);
    });

    // TODO: 新版本G中没有相对于画布坐标的bbox
    it('loop', () => {
      const div = document.createElement('div');
      div.id = 'graph-spec';
      document.body.appendChild(div);
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
      });
      const data = {
        nodes: [{ id: 'node0', x: 100, y: 100 }],
        edges: [
          {
            source: 'node0',
            target: 'node0',
            type: 'loop',
          },
        ],
      };
      graph.data(data);
      graph.render();
      const node = graph.getNodes()[0];
      const edge = graph.getEdges()[0];
      const path = edge.get('group').getChildren()[0];
      // let bbox = path.getBBox();
      // console.log(bbox);
      // expect(bbox.minX).toEqual(90.60845891791658);
      let bbox = path.getBounds();
      console.log(bbox);
      expect(bbox.min[0]).toEqual(90.60845891791658);
    });

    it('clear', () => {
      // canvas.clear();
      canvas.getRoot().removeChildren(true);
    });
  });

  // TODO: 还未测试，有label，arrow，rotate等问题
  describe('label align', () => {
    const factory = Shape.getFactory('edge');
    function getPoint(center, radius, angle) {
      return {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
      };
    }
    it('auto rotate with arrow', () => {
      const center = { x: 100, y: 100 };
      const canvasGroup = new Group();
      canvas.appendChild(canvasGroup);
      for (let i = 0; i < 360; i += 45) {
        const angle = (i / 180) * Math.PI;
        const startPoint = getPoint(center, 20, angle);
        const endPoint = getPoint(center, 60, angle);
        const group = new Group();
        canvasGroup.appendChild(group);
        factory.draw(
          'line',
          {
            startPoint,
            endPoint,
            color: 'red',
            label: i.toString(),
            style: {
              endArrow: true,
            },
            labelCfg: {
              autoRotate: true,
              style: {
                stroke: 'white',
                lineWidth: 5,
              },
            },
          },
          group,
        );
        group.setMatrix([0.5, 0, 0, 0, 0.5, 0, 0, 0, 1]);
        group.setMatrix([0.5, 0, 0, 0, 0.5, 0, 100, 100, 1]);
      }
      canvasGroup.setMatrix([0.8, 0, 0, 0, 0.8, 0, 0, 0, 1]);
      canvasGroup.setMatrix([0.8, 0, 0, 0, 0.8, 0, 200, 200, 1]);
      canvas.render();
      const label = canvasGroup.getChildren()[1].getChildren()[1];
      expect(label.attr('rotate')).toBe(undefined);
      expect(label.attr('matrix')[0]).toBe(0.7071067811865476);
      expect(label.attr('matrix')[3]).toBe(-0.7071067811865475);
      expect(label.attr('matrix')[6]).toBe(128.2842712474619);
      expect(label.attr('matrix')[7]).toBe(-53.13708498984761);
    });
    it('not auto rotate, middle', () => {
      const center = { x: 100, y: 100 };
      for (let i = 0; i < 360; i += 45) {
        const angle = (i / 180) * Math.PI;
        const startPoint = getPoint(center, 20, angle);
        const endPoint = getPoint(center, 60, angle);
        const group = new Group();
        canvas.appendChild(group);
        factory.draw(
          'line',
          {
            startPoint,
            endPoint,
            color: 'red',
            label: i.toString(),
            style: {
              endArrow: true,
            },
            labelCfg: {
              style: {
                stroke: 'white',
                lineWidth: 5,
              },
            },
          },
          group,
        );
        const label = group.getChildren()[1];
        // expect(label.attr('textAlign')).toEqual('center');

        // expect(label.attr('stroke')).toEqual('white');
      }
      canvas.render();
    });

    it('not auto rotate, start', () => {
      const center = { x: 250, y: 100 };
      const circle = new Circle({
        attrs: {
          x: center.x,
          y: center.y,
          r: 40,
          stroke: 'blue',
        },
      });
      canvas.appendChild(circle);
      for (let i = 0; i < 360; i += 30) {
        const angle = (i / 180) * Math.PI;
        const startPoint = getPoint(center, 40, angle);
        const endPoint = getPoint(center, 80, angle);
        const group = new Group();
        canvas.appendChild(group);
        factory.draw(
          'line',
          {
            startPoint,
            endPoint,
            color: 'red',
            label: i.toString(),
            labelCfg: {
              position: 'start',
            },
            style: {
              endArrow: true,
            },
          },
          group,
        );
        const label = group.getChildren()[1];
        if (angle < (1 / 2) * Math.PI) {
          expect(label.attr('textAlign')).toEqual('start');
        }
        if (angle > (1 / 2) * Math.PI && angle < (3 / 2) * Math.PI) {
          expect(label.attr('textAlign')).toEqual('end');
        }
        // expect(label.attr('textAlign')).toEqual('center');
      }
      canvas.render();
    });

    it('not auto rotate, end', () => {
      const center = { x: 450, y: 100 };
      const circle = new Circle({
        attrs: {
          x: center.x,
          y: center.y,
          r: 40,
          stroke: 'blue',
        },
      });
      canvas.appendChild(circle);
      for (let i = 0; i < 360; i += 30) {
        const angle = (i / 180) * Math.PI;
        const startPoint = getPoint(center, 40, angle);
        const endPoint = getPoint(center, 80, angle);
        const group = new Group();
        canvas.appendChild(group);
        factory.draw(
          'line',
          {
            startPoint,
            endPoint,
            color: 'red',
            label: i.toString(),
            style: {
              endArrow: true,
            },
            labelCfg: {
              position: 'end',
            },
          },
          group,
        );
        const label = group.getChildren()[1];
        if (angle < (1 / 2) * Math.PI) {
          expect(label.attr('textAlign')).toEqual('end');
        }
        if (angle > (1 / 2) * Math.PI && angle < (3 / 2) * Math.PI) {
          expect(label.attr('textAlign')).toEqual('start');
        }
        // expect(label.attr('textAlign')).toEqual('center');
      }
      canvas.render();
    });

    it('auto rotate, middle', () => {
      const center = { x: 100, y: 300 };
      for (let i = 0; i < 360; i += 45) {
        const angle = (i / 180) * Math.PI;
        const startPoint = getPoint(center, 20, angle);
        const endPoint = getPoint(center, 60, angle);
        const group = new Group();
        canvas.appendChild(group);
        factory.draw(
          'line',
          {
            startPoint,
            endPoint,
            color: 'red',
            label: i.toString(),
            style: {
              endArrow: true,
            },
            labelCfg: {
              autoRotate: true,
            },
          },
          group,
        );
        const label = group.getChildren()[1];
        expect(label.attr('textAlign')).toEqual('center');
      }
      canvas.render();
    });

    it('auto rotate, start', () => {
      const center = { x: 250, y: 300 };
      const circle = new Circle({
        attrs: {
          x: center.x,
          y: center.y,
          r: 40,
          stroke: 'blue',
        },
      });
      canvas.appendChild(circle);
      for (let i = 0; i < 360; i += 30) {
        const angle = (i / 180) * Math.PI;
        const startPoint = getPoint(center, 40, angle);
        const endPoint = getPoint(center, 80, angle);
        const group = new Group();
        canvas.appendChild(group);
        factory.draw(
          'line',
          {
            startPoint,
            endPoint,
            color: 'red',
            label: i.toString(),
            style: {
              endArrow: true,
            },
            labelCfg: {
              position: 'start',
              autoRotate: true,
            },
          },
          group,
        );
        const label = group.getChildren()[1];
        if (angle < (1 / 2) * Math.PI) {
          expect(label.attr('textAlign')).toEqual('start');
        }
        if (angle > (1 / 2) * Math.PI && angle < (3 / 2) * Math.PI) {
          expect(label.attr('textAlign')).toEqual('end');
        }
        // expect(label.attr('textAlign')).toEqual('center');
      }
      canvas.render();
    });

    it('auto rotate, end', () => {
      const center = { x: 450, y: 300 };
      const circle = new Circle({
        attrs: {
          x: center.x,
          y: center.y,
          r: 40,
          stroke: 'blue',
        },
      });
      canvas.appendChild(circle);
      for (let i = 0; i < 360; i += 30) {
        const angle = (i / 180) * Math.PI;
        const startPoint = getPoint(center, 40, angle);
        const endPoint = getPoint(center, 80, angle);
        const group = new Group();
        canvas.appendChild(group);
        const shape = factory.draw(
          'line',
          {
            startPoint,
            endPoint,
            color: 'red',
            label: i.toString(),
            style: {
              endArrow: true,
            },
            labelCfg: {
              position: 'end',
              autoRotate: true,
            },
          },
          group,
        );
        const label = group.getChildren()[1];
        if (angle < (1 / 2) * Math.PI) {
          expect(label.attr('textAlign')).toEqual('end');
        }
        if (angle > (1 / 2) * Math.PI && angle < (3 / 2) * Math.PI) {
          expect(label.attr('textAlign')).toEqual('start');
        }

        const point = shape.getPoint(1);
        expect(label.attr('x')).toEqual(point.x);
        expect(label.attr('y')).toEqual(point.y);
      }
      canvas.render();
    });

    it('curve rotate center', () => {
      const group = new Group();
      canvas.appendChild(group);
      const shape = factory.draw(
        'cubic',
        {
          startPoint: { x: 100, y: 400 },
          endPoint: { x: 200, y: 400 },
          controlPoints: [
            { x: 120, y: 380 },
            { x: 160, y: 420 },
          ],
          color: 'blue',
          label: 'curve in center',
          labelCfg: {
            autoRotate: true,
          },
        },
        group,
      );
      const path = shape.attr('path');
      const label = group.getChildren()[1];
      expect(path.length).toEqual(2);

      const point = shape.getPoint(0.5);
      expect(point.x).toEqual(label.attr('x'));
      expect(point.y).toEqual(label.attr('y'));

      canvas.render();
    });

    it('curve rotate start', () => {
      const group = new Group();
      canvas.appendChild(group);
      const shape = factory.draw(
        'cubic',
        {
          startPoint: { x: 220, y: 400 },
          endPoint: { x: 320, y: 400 },
          controlPoints: [
            { x: 230, y: 380 },
            { x: 280, y: 420 },
          ],
          color: 'blue',
          label: 'start',
          labelCfg: {
            position: 'start',
            autoRotate: true,
          },
        },
        group,
      );
      const path = shape.attr('path');
      const label = group.getChildren()[1];
      expect(path.length).toEqual(2);

      const point = shape.getPoint(0);
      expect(point.x).toEqual(label.attr('x'));
      expect(point.y).toEqual(label.attr('y'));
      expect(label.attr('rotate')).not.toEqual(0);
      canvas.render();
    });

    it('text on line, text refX and refY', () => {
      const center = { x: 250, y: 500 };
      const circle = new Circle({
        attrs: {
          x: center.x,
          y: center.y,
          r: 40,
          stroke: 'blue',
        },
      });
      canvas.appendChild(circle);
      for (let i = 0; i < 360; i += 30) {
        const angle = (i / 180) * Math.PI;
        const startPoint = getPoint(center, 40, angle);
        const endPoint = getPoint(center, 80, angle);
        const group = new Group();
        canvas.appendChild(group);
        factory.draw(
          'line',
          {
            startPoint,
            endPoint,
            color: 'red',
            label: i.toString(),
            style: {
              endArrow: true,
            },
            labelCfg: {
              position: 'start',
              autoRotate: true,
              refX: 4,
              refY: 5,
            },
          },
          group,
        );
        const label = group.getChildren()[1];
        if (angle < (1 / 2) * Math.PI) {
          expect(label.attr('textAlign')).toEqual('start');
        }
        if (angle > (1 / 2) * Math.PI && angle < (3 / 2) * Math.PI) {
          expect(label.attr('textAlign')).toEqual('end');
        }
        // expect(label.attr('textAlign')).toEqual('center');
      }
      canvas.render();
    });

    function distance(p1, p2) {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }
    function equal(x1, x2) {
      return Math.abs(x1 - x2) < 0.0001;
    }

    it('text on curve, text refX and refY', () => {
      const group = new Group();
      canvas.appendChild(group);
      const shape = factory.draw(
        'spline',
        {
          startPoint: { x: 220, y: 400 },
          endPoint: { x: 320, y: 400 },
          controlPoints: [
            { x: 230, y: 380 },
            { x: 280, y: 420 },
          ],
          color: 'pink',
          label: 'center',
          labelCfg: {
            position: 'center',
            autoRotate: true,
            refX: 3,
            refY: 4,
          },
        },
        group,
      );

      const point = shape.getPoint(0.5);
      const label = group.getChildren()[1];
      // 3*3 + 4*4 = 5*5
      expect(equal(distance(point, { x: label.attr('x'), y: label.attr('y') }), 5)).toEqual(true);
      canvas.render();
    });

    it('text offset only one dim', () => {
      const group = new Group();
      canvas.appendChild(group);
      const shape = factory.draw(
        'line',
        {
          startPoint: { x: 220, y: 400 },
          endPoint: { x: 320, y: 400 },
          color: 'pink',
          label: 'center',
          labelCfg: {
            position: 'center',
            autoRotate: true,
            refX: 5,
          },
        },
        group,
      );
      const point = shape.getPoint(0.5);
      const label = group.getChildren()[1];
      expect(equal(distance(point, { x: label.attr('x'), y: label.attr('y') }), 5)).toEqual(true);
    });
  });
});
