import pkg from '@/package.json';
import { version } from '@/src';

describe('version', () => {
  it('version', () => {
    expect(version).toBe(pkg.version);
  });
});
