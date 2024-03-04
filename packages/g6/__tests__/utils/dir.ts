import path from 'path';

/**
 * <zh/> 获取快照目录
 *
 * <en/> Get snapshot directory
 * @param dir - __filename
 * @param format - <zh/> 格式化命名，{name} 为文件名 | <en/> format name, {name} is file name
 * @returns <zh/> 快照目录 | <en/> snapshot directory
 */
export function getSnapshotDir(dir: string, format: string): [string, string] {
  const root = process.cwd();
  const subDir = dir.replace(root, '').replace('__tests__/unit/', '').replace('.spec.ts', '');
  const outputDir = path.join(root, '__tests__', 'snapshots', subDir);
  const name = path.basename(dir, '.spec.ts');
  return [outputDir, format.replace('{name}', name)];
}
