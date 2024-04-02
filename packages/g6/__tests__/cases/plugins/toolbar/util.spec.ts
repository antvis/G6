import { parsePositionToStyle } from '@/src/plugins/toolbar/util';

describe('util', () => {
  it('parsePositionToStyle', () => {
    expect(parsePositionToStyle('top-left')).toEqual({
      top: '8px',
      right: 'unset',
      bottom: 'unset',
      left: '8px',
      flexDirection: 'row',
    });
    expect(parsePositionToStyle('top-right')).toEqual({
      top: '8px',
      right: '8px',
      bottom: 'unset',
      left: 'unset',
      flexDirection: 'row',
    });
    expect(parsePositionToStyle('bottom-left')).toEqual({
      top: 'unset',
      right: 'unset',
      bottom: '8px',
      left: '8px',
      flexDirection: 'row',
    });
    expect(parsePositionToStyle('bottom-right')).toEqual({
      top: 'unset',
      right: '8px',
      bottom: '8px',
      left: 'unset',
      flexDirection: 'row',
    });

    expect(parsePositionToStyle('left-top')).toEqual({
      top: '8px',
      right: 'unset',
      bottom: 'unset',
      left: '8px',
      flexDirection: 'column',
    });
    expect(parsePositionToStyle('right-top')).toEqual({
      top: '8px',
      right: '8px',
      bottom: 'unset',
      left: 'unset',
      flexDirection: 'column',
    });
    expect(parsePositionToStyle('left-bottom')).toEqual({
      top: 'unset',
      right: 'unset',
      bottom: '8px',
      left: '8px',
      flexDirection: 'column',
    });
    expect(parsePositionToStyle('right-bottom')).toEqual({
      top: 'unset',
      right: '8px',
      bottom: '8px',
      left: 'unset',
      flexDirection: 'column',
    });
  });
});
