import { getAncestorShapes, getDescendantShapes } from '@/src/utils/shape';
import { Circle, Group, Line, Rect } from '@antv/g';

describe('shape', () => {
  it('getDescendantShapes', () => {
    const group = new Group();
    const rect = group.appendChild(new Rect());
    const circleGroup = group.appendChild(new Group());
    const circle = circleGroup.appendChild(new Circle());
    const line = circleGroup.appendChild(new Line());

    expect(getDescendantShapes(group)).toEqual([rect, circleGroup, circle, line]);

    expect(getDescendantShapes(circleGroup)).toEqual([circle, line]);

    expect(getDescendantShapes(circle)).toEqual([]);
  });

  it('getDescendantShapes with marker', () => {
    const marker = new Rect({
      style: {
        width: 10,
        height: 10,
      },
    });

    const line = new Line({
      style: {
        x1: 0,
        y1: 0,
        x2: 100,
        y2: 100,
        markerEnd: marker,
      },
    });

    expect(getDescendantShapes(line)[0]).not.toBe(marker);
    expect(getDescendantShapes(line)[0]).toBe(line.parsedStyle.markerEnd);
  });

  it('getAncestorShapes', () => {
    const group = new Group();
    const rect = group.appendChild(new Rect());
    const circleGroup = group.appendChild(new Group());
    const circle = circleGroup.appendChild(new Circle());

    expect(getAncestorShapes(group)).toEqual([]);
    expect(getAncestorShapes(rect)).toEqual([group]);
    expect(getAncestorShapes(circle)).toEqual([circleGroup, group]);
  });
});
