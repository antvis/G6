import { Circle, Group, Line, Rect } from '@antv/g';
import { getDescendantShapes } from '@g6/utils/shape';

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
});
