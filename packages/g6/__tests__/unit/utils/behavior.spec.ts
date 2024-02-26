import { BehaviorOptions } from '@/src';
import { parseBehaviors } from '@/src/utils/behaviors';

describe('behavior', () => {
  it('parseBehaviors', () => {
    expect(parseBehaviors([])).toEqual([]);

    const options: BehaviorOptions = [
      'drag-node',
      { type: 'drag-canvas' },
      { type: 'shortcut', key: 'shortcut-zoom-in' },
      { type: 'shortcut', key: 'shortcut-zoom-out' },
      'scroll-canvas',
      'scroll-canvas',
    ];

    expect(parseBehaviors(options)).toEqual([
      { type: 'drag-node', key: 'behavior-drag-node-0' },
      { type: 'drag-canvas', key: 'behavior-drag-canvas-0' },
      { type: 'shortcut', key: 'shortcut-zoom-in' },
      { type: 'shortcut', key: 'shortcut-zoom-out' },
      { type: 'scroll-canvas', key: 'behavior-scroll-canvas-0' },
      { type: 'scroll-canvas', key: 'behavior-scroll-canvas-1' },
    ]);
  });
});
