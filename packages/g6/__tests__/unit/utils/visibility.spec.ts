import { BaseShape } from '@/src';
import { setVisibility } from '@/src/utils/visibility';
import { Circle } from '@antv/g';

class Shape extends BaseShape<{ visibility: 'visible' | 'hidden' }> {
  render() {
    this.upsert('visibleShape', Circle, { r: 10 }, this);
    this.upsert('hiddenShape', Circle, { r: 10, visibility: 'hidden' }, this);
  }
}

describe('visibility', () => {
  it('shape visibility', () => {
    const shape = new Shape({});
    const vShape = shape.getShape('visibleShape');
    const hShape = shape.getShape('hiddenShape');

    expect(shape.style.visibility).toBe(undefined);
    expect(vShape.style.visibility).toBe(undefined);
    expect(hShape.style.visibility).toBe('hidden');

    setVisibility(shape, 'hidden');
    expect(shape.style.visibility).toBe('hidden');
    expect(vShape.style.visibility).toBe('hidden');
    expect(hShape.style.visibility).toBe('hidden');

    setVisibility(shape, 'visible');
    expect(shape.style.visibility).toBe('visible');
    expect(vShape.style.visibility).toBe('visible');
    expect(hShape.style.visibility).toBe('hidden');
  });

  it('default is hidden', () => {
    const shape = new Shape({ style: { visibility: 'hidden' } });
    const vShape = shape.getShape('visibleShape');
    const hShape = shape.getShape('hiddenShape');

    expect(shape.style.visibility).toBe('hidden');
    expect(vShape.style.visibility).toBe('hidden');
    expect(hShape.style.visibility).toBe('hidden');

    setVisibility(shape, 'visible');
    expect(shape.style.visibility).toBe('visible');
    expect(vShape.style.visibility).toBe('visible');
    expect(hShape.style.visibility).toBe('hidden');
  });

  it('setVisibility', () => {
    /**
     * d: default
     * v: visible
     * h: hidden
     *           d
     *       /   |   \
     *    d      v     h
     *   /|\    /|\   /|\
     *  d v h  d v h d b h
     */

    const root = new Circle({ id: 'root', style: { r: 10 } });
    const l1 = root.appendChild(new Circle({ id: 'l1', style: { r: 10 } }));
    const l2 = root.appendChild(new Circle({ id: 'l2', style: { r: 10, visibility: 'visible' } }));
    const l3 = root.appendChild(new Circle({ id: 'l3', style: { r: 10, visibility: 'hidden' } }));
    const l1_1 = l1.appendChild(new Circle({ id: 'l1_1', style: { r: 10 } }));
    const l1_2 = l1.appendChild(new Circle({ id: 'l1_2', style: { r: 10, visibility: 'visible' } }));
    const l1_3 = l1.appendChild(new Circle({ id: 'l1_3', style: { r: 10, visibility: 'hidden' } }));
    const l2_1 = l2.appendChild(new Circle({ id: 'l2_1', style: { r: 10 } }));
    const l2_2 = l2.appendChild(new Circle({ id: 'l2_2', style: { r: 10, visibility: 'visible' } }));
    const l2_3 = l2.appendChild(new Circle({ id: 'l2_3', style: { r: 10, visibility: 'hidden' } }));
    const l3_1 = l3.appendChild(new Circle({ id: 'l3_1', style: { r: 10 } }));
    const l3_2 = l3.appendChild(new Circle({ id: 'l3_2', style: { r: 10, visibility: 'visible' } }));
    const l3_3 = l3.appendChild(new Circle({ id: 'l3_3', style: { r: 10, visibility: 'hidden' } }));

    const assertDefault = () => {
      expect(root.style.visibility).toBe(undefined);
      expect(l1.style.visibility).toBe(undefined);
      expect(l2.style.visibility).toBe('visible');
      expect(l3.style.visibility).toBe('hidden');
      expect(l1_1.style.visibility).toBe(undefined);
      expect(l1_2.style.visibility).toBe('visible');
      expect(l1_3.style.visibility).toBe('hidden');
      expect(l2_1.style.visibility).toBe(undefined);
      expect(l2_2.style.visibility).toBe('visible');
      expect(l2_3.style.visibility).toBe('hidden');
      expect(l3_1.style.visibility).toBe(undefined);
      expect(l3_2.style.visibility).toBe('visible');
      expect(l3_3.style.visibility).toBe('hidden');
    };

    const assertHidden = () => {
      expect(root.style.visibility).toBe('hidden');
      expect(l1.style.visibility).toBe('hidden');
      expect(l2.style.visibility).toBe('hidden');
      expect(l3.style.visibility).toBe('hidden');
      expect(l1_1.style.visibility).toBe('hidden');
      expect(l1_2.style.visibility).toBe('hidden');
      expect(l1_3.style.visibility).toBe('hidden');
      expect(l2_1.style.visibility).toBe('hidden');
      expect(l2_2.style.visibility).toBe('hidden');
      expect(l2_3.style.visibility).toBe('hidden');
      expect(l3_1.style.visibility).toBe('hidden');
      expect(l3_2.style.visibility).toBe('hidden');
      expect(l3_3.style.visibility).toBe('hidden');
    };

    const assertVisible = () => {
      expect(root.style.visibility).toBe('visible');
      expect(l1.style.visibility).toBe('visible');
      expect(l2.style.visibility).toBe('visible');
      expect(l3.style.visibility).toBe('hidden');
      expect(l1_1.style.visibility).toBe('visible');
      expect(l1_2.style.visibility).toBe('visible');
      expect(l1_3.style.visibility).toBe('hidden');
      expect(l2_1.style.visibility).toBe('visible');
      expect(l2_2.style.visibility).toBe('visible');
      expect(l2_3.style.visibility).toBe('hidden');
      expect(l3_1.style.visibility).toBe('hidden');
      expect(l3_2.style.visibility).toBe('hidden');
      expect(l3_3.style.visibility).toBe('hidden');
    };

    assertDefault();

    setVisibility(root, 'hidden');

    assertHidden();

    setVisibility(root, 'visible');

    assertVisible();

    setVisibility(root, 'hidden');

    assertHidden();
  });

  it('setVisibility 2', () => {
    const root = new Circle({ id: 'root', style: { r: 10 } });
    const level1 = root.appendChild(new Circle({ id: 'level1', style: { r: 10 } }));
    const level2 = level1.appendChild(new Circle({ id: 'level2', style: { r: 10 } }));

    expect(root.style.visibility).toBe(undefined);
    expect(level1.style.visibility).toBe(undefined);
    expect(level2.style.visibility).toBe(undefined);

    setVisibility(level1, 'hidden');
    expect(root.style.visibility).toBe(undefined);
    expect(level1.style.visibility).toBe('hidden');
    expect(level2.style.visibility).toBe('hidden');

    setVisibility(level1, 'visible');
    expect(root.style.visibility).toBe(undefined);
    expect(level1.style.visibility).toBe('visible');
    expect(level2.style.visibility).toBe('visible');

    setVisibility(root, 'hidden');
    expect(root.style.visibility).toBe('hidden');
    expect(level1.style.visibility).toBe('hidden');
    expect(level2.style.visibility).toBe('hidden');

    setVisibility(root, 'visible');
    expect(root.style.visibility).toBe('visible');
    expect(level1.style.visibility).toBe('visible');
    expect(level2.style.visibility).toBe('visible');

    setVisibility(level1, 'hidden');
    expect(root.style.visibility).toBe('visible');
    expect(level1.style.visibility).toBe('hidden');
    expect(level2.style.visibility).toBe('hidden');

    setVisibility(root, 'hidden');
    expect(root.style.visibility).toBe('hidden');
    expect(level1.style.visibility).toBe('hidden');
    expect(level2.style.visibility).toBe('hidden');

    setVisibility(root, 'visible');
    expect(root.style.visibility).toBe('visible');
    expect(level1.style.visibility).toBe('hidden');
    expect(level2.style.visibility).toBe('hidden');

    setVisibility(level1, 'visible');
    expect(root.style.visibility).toBe('visible');
    expect(level1.style.visibility).toBe('visible');
    expect(level2.style.visibility).toBe('visible');
  });
});
