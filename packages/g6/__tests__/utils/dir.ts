import path from 'path';

/**
 * <zh/> 获取快照目录
 *
 * <en/> Get snapshot directory
 * @param dir - __filename
 * @param detail - <zh/> 快照详情 | <en/> snapshot detail
 * @returns <zh/> 快照目录 | <en/> snapshot directory
 */
export function getSnapshotDir(dir: string, detail: string = 'default'): [string, string] {
  const root = process.cwd();
  const subDir = dir.replace(root, '').replace('__tests__/unit/', '').replace('.spec.ts', '');
  const outputDir = path.join(root, '__tests__', 'snapshots', subDir);
  return [outputDir, detail];
}
