import { invariant, info, warn, error } from '../../../src/utils/invariant';

describe('invariant', () => {
  it('invariant', () => {
    expect(() => {
      invariant('throw hello world!',);
    }).toThrow('throw hello world!');
  });

  it('log', () => {
    const fn = jest.fn();
    window.console.error = fn;
    window.console.warn = fn;
    window.console.log = fn;

    error('error hello world!');
    expect(fn).toHaveBeenCalledWith('G6: error hello world!');

    warn('warn hello world!');
    expect(fn).toHaveBeenCalledWith('G6: warn hello world!');

    info('info hello world!');
    expect(fn).toHaveBeenCalledWith('G6: info hello world!');
  });
});
