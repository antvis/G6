import { cacheStyle, getCachedStyle, hasCachedStyle, setCacheStyle } from '@/src/utils/cache';
import { Circle } from '@antv/g';

describe('cache', () => {
  it('cacheStyle and getCachedStyle and setCacheStyle', () => {
    const circle = new Circle({
      style: {
        r: 10,
        fill: 'red',
        stroke: 'blue',
      },
    });

    expect(hasCachedStyle(circle, 'fill')).toBe(false);

    cacheStyle(circle, ['fill', 'stroke']);

    circle.style.fill = 'green';

    expect(hasCachedStyle(circle, 'fill')).toBe(true);

    expect(getCachedStyle(circle, 'fill')).toBe('red');

    setCacheStyle(circle, 'fill', 'yellow');

    expect(getCachedStyle(circle, 'fill')).toBe('yellow');
  });
});
