import { createPluginContainer, sizeOf } from '@/src/utils/dom';

describe('sizeOf', () => {
  it('should return the size of the graph container', () => {
    // Create a mock container element
    const container = document.createElement('div');
    container.style.width = '500px';
    container.style.height = '300px';

    // Call the sizeOf function
    const result = sizeOf(container);

    // Assert the result
    expect(result).toEqual([500, 300]);
  });

  it('createPluginContainer', () => {
    const el = createPluginContainer('test');
    expect(el.getAttribute('class')).toBe('g6-test');
    expect(el.style.position).toBe('absolute');
    expect(el.style.display).toBe('block');
    expect(el.style.top).toBe('0px');
    expect(el.style.left).toBe('0px');
    expect(el.style.height).toBe('100%');
    expect(el.style.width).toBe('100%');
    expect(el.style.overflow).toBe('hidden');
    expect(el.style.pointerEvents).toBe('none');
  });

  it('createPluginContainer cover=false', () => {
    const el = createPluginContainer('test', false);
    expect(el.getAttribute('class')).toBe('g6-test');
    expect(el.style.position).toBe('absolute');
    expect(el.style.display).toBe('block');
    expect(el.style.height).not.toBe('100%');
    expect(el.style.width).not.toBe('100%');
    expect(el.style.overflow).not.toBe('hidden');
    expect(el.style.pointerEvents).not.toBe('none');
  });
});
