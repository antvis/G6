import { BaseShape } from '@/src';
import { Circle } from '@antv/g';

class Shape extends BaseShape<{ visibility: 'visible' | 'hidden' }> {
  render() {
    this.upsert('visibleShape', Circle, { r: 10 }, this);
    this.upsert('hiddenShape', Circle, { r: 10, visibility: 'hidden' }, this);
  }
}

describe('visibility', () => {
  it('setVisibility', () => {
    const shape = new Shape({});
    // @ts-expect-error shapeMap is private
    const vShape = shape.shapeMap.visibleShape;
    // @ts-expect-error shapeMap is private
    const hShape = shape.shapeMap.hiddenShape;

    expect(shape.style.visibility).toBe(undefined);
    expect(vShape.style.visibility).toBe(undefined);
    expect(hShape.style.visibility).toBe('hidden');

    shape.update({ visibility: 'hidden' });
    expect(shape.style.visibility).toBe('hidden');
    expect(vShape.style.visibility).toBe('hidden');
    expect(hShape.style.visibility).toBe('hidden');

    shape.update({ visibility: 'visible' });
    expect(shape.style.visibility).toBe('visible');
    expect(vShape.style.visibility).toBe('visible');
    expect(hShape.style.visibility).toBe('hidden');
  });

  it('setVisibility default is hidden', () => {
    const shape = new Shape({ style: { visibility: 'hidden' } });
    // @ts-expect-error shapeMap is private
    const vShape = shape.shapeMap.visibleShape;
    // @ts-expect-error shapeMap is private
    const hShape = shape.shapeMap.hiddenShape;

    expect(shape.style.visibility).toBe('hidden');
    expect(vShape.style.visibility).toBe('hidden');
    expect(hShape.style.visibility).toBe('hidden');

    shape.update({ visibility: 'visible' });
    expect(shape.style.visibility).toBe('visible');
    expect(vShape.style.visibility).toBe('visible');
    expect(hShape.style.visibility).toBe('hidden');
  });
});
