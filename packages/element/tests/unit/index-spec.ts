import { version } from '../../package.json';
import Global from '../../src/global';

describe('G6 version', () => {
  it('export', () => {
    expect(Global.version).toBe(version);
  });
});
