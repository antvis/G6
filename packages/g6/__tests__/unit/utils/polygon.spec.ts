import { getPolygonTextStyleByPlacement } from '@/src/utils/polygon';
import type { TransformArray } from '@antv/g';
import { AABB, Path } from '@antv/g';
import type { PathArray } from '@antv/util';

describe('polygon', () => {
  const EMPTY_PATH: PathArray = [
    ['M', 0, 0],
    ['L', 0, 0],
  ];

  it('getPolygonTextStyleByPlacement', () => {
    const bounds = new AABB();
    bounds.setMinMax([0, 0, 0], [100, 100, 0]);
    // different placement
    expect(getPolygonTextStyleByPlacement(bounds, 'top', 0, 0, false, EMPTY_PATH, false)).toEqual({
      textAlign: 'center',
      textBaseline: 'bottom',
      transform: [['translate', 50, 0]],
    });
    expect(getPolygonTextStyleByPlacement(bounds, 'left', 0, 0, false, EMPTY_PATH, false)).toEqual({
      textAlign: 'right',
      textBaseline: 'middle',
      transform: [['translate', 0, 50]],
    });
    expect(getPolygonTextStyleByPlacement(bounds, 'right', 0, 0, false, EMPTY_PATH, false)).toEqual({
      textAlign: 'left',
      textBaseline: 'middle',
      transform: [['translate', 100, 50]],
    });
    expect(getPolygonTextStyleByPlacement(bounds, 'bottom', 0, 0, false, EMPTY_PATH, false)).toEqual({
      textAlign: 'center',
      textBaseline: 'top',
      transform: [['translate', 50, 100]],
    });

    // with offset
    expect(getPolygonTextStyleByPlacement(bounds, 'top', 10, 10, false, EMPTY_PATH, false)).toEqual({
      textAlign: 'center',
      textBaseline: 'bottom',
      transform: [['translate', 60, 10]],
    });

    // closeToHull and autoRotate
    const circle: PathArray = [
      ['M', 0, 0],
      ['A', 100, 100, 0, 0, 0, 100, 0],
    ];
    expect(getPolygonTextStyleByPlacement(bounds, 'top', 0, 0, true, circle, true)).toEqual({
      textAlign: 'center',
      textBaseline: 'bottom',
      transform: [['translate', 50, 0]],
    });

    const d: PathArray = [
      ['M', 0, 0],
      ['L', 100, 20],
      ['L', 80, 100],
      ['L', 0, 60],
      ['L', 0, 0],
    ];
    const shape = new Path({ style: { d } });
    const labelStyle1 = getPolygonTextStyleByPlacement(shape.getRenderBounds(), 'top', 0, 0, true, d, true);
    expect(labelStyle1.textAlign).toBe('center');
    expect(labelStyle1.textBaseline).toBe('bottom');
    expect((labelStyle1.transform as TransformArray).some((t) => t[0] === 'rotate')).toBe(true);

    const labelStyle2 = getPolygonTextStyleByPlacement(shape.getRenderBounds(), 'right', 0, 0, true, d, true);
    expect(labelStyle2.textAlign).toBe('center');
    expect(labelStyle2.textBaseline).toBe('top');
    expect((labelStyle2.transform as TransformArray).some((t) => t[0] === 'rotate')).toBe(true);

    const labelStyle3 = getPolygonTextStyleByPlacement(shape.getRenderBounds(), 'bottom', 0, 0, true, d, true);
    expect(labelStyle3.textAlign).toBe('center');
    expect(labelStyle3.textBaseline).toBe('top');
    expect((labelStyle3.transform as TransformArray).some((t) => t[0] === 'rotate')).toBe(true);

    const labelStyle4 = getPolygonTextStyleByPlacement(shape.getRenderBounds(), 'left', 0, 0, true, d, true);
    expect(labelStyle4.textAlign).toBe('center');
    expect(labelStyle4.textBaseline).toBe('top');
    expect((labelStyle4.transform as TransformArray).some((t) => t[0] === 'rotate')).toBe(true);
  });
});
