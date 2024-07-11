import { version } from '@/src';
import { print } from '@/src/utils/print';

describe('print', () => {
  it('print', () => {
    const spy = jest.spyOn(console, 'debug').mockImplementation();
    print.debug('debug message');
    expect(spy).toHaveBeenCalledWith(`[G6 v${version}] debug message`);
    spy.mockRestore();

    const spy2 = jest.spyOn(console, 'info').mockImplementation();
    print.info('info message');
    expect(spy2).toHaveBeenCalledWith(`[G6 v${version}] info message`);
    spy2.mockRestore();

    const spy3 = jest.spyOn(console, 'warn').mockImplementation();
    print.warn('warn message');
    expect(spy3).toHaveBeenCalledWith(`[G6 v${version}] warn message`);
    spy3.mockRestore();

    const spy4 = jest.spyOn(console, 'error').mockImplementation();
    print.error('error message');
    expect(spy4).toHaveBeenCalledWith(`[G6 v${version}] error message`);
    spy4.mockRestore();
  });

  it('print mute', () => {
    print.mute = true;

    const spy = jest.spyOn(console, 'debug').mockImplementation();
    print.debug('debug message');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();

    const spy2 = jest.spyOn(console, 'info').mockImplementation();
    print.info('info message');
    expect(spy2).not.toHaveBeenCalled();
    spy2.mockRestore();

    const spy3 = jest.spyOn(console, 'warn').mockImplementation();
    print.warn('warn message');
    expect(spy3).not.toHaveBeenCalled();
    spy3.mockRestore();

    const spy4 = jest.spyOn(console, 'error').mockImplementation();
    print.error('error message');
    expect(spy4).not.toHaveBeenCalled();
    spy4.mockRestore();

    print.mute = false;
  });
});
