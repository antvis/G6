import { createPluginContainer, insertDOM } from '@/src/plugins/utils/dom';

describe('plugin dom utils', () => {
  it('createPluginContainer', () => {
    const el = createPluginContainer('test');
    expect(el.getAttribute('class')).toBe('g6-test');
    expect(el.style.position).toBe('unset');
    expect(el.style.display).toBe('block');
    expect(el.style.inset).toBe('0px');
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

  it('createPluginContainer with style', () => {
    const el = createPluginContainer('test', false, { color: 'red' });
    expect(el.getAttribute('class')).toBe('g6-test');
    expect(el.style.color).toBe('red');
  });

  it('insertDOM', () => {
    insertDOM('g6-test', 'div', { color: 'red' }, 'test', document.body);

    let el = document.getElementById('g6-test')!;
    expect(el).toBeTruthy();
    expect(el.style.color).toBe('red');
    expect(el.innerHTML).toBe('test');

    insertDOM('g6-test', 'div', { color: 'red' }, 'new html', document.body);

    el = document.getElementById('g6-test')!;
    expect(el.innerHTML).toBe('new html');

    el = insertDOM('g6-test');
    expect(el.tagName.toLowerCase()).toBe('div');
    expect(el.innerHTML).toBe('');
    expect(el.parentNode).toBe(document.body);
  });
});
