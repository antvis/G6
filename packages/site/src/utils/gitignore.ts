import { FileSystem } from '@rushstack/node-core-library';
import * as path from 'path';

/**
 * Get the path to the .gitignore file
 * @param outputFolder - The output folder
 * @returns The path to the .gitignore file
 */
function getGitignorePath(outputFolder: string): string {
  return path.join(outputFolder, '.gitignore');
}

/**
 * Initialize the .gitignore file
 * @param outputFolder - The output folder
 */
export function initGitignore(outputFolder: string) {
  const gitPath = getGitignorePath(outputFolder);
  FileSystem.writeFile(gitPath, '');
}

/**
 * Sync the filename to the .gitignore file
 * @param outputFolder - The output folder
 * @param filename - The filename to sync
 */
export function syncToGitignore(outputFolder: string, filename: string) {
  const gitPath = getGitignorePath(outputFolder);
  FileSystem.appendToFile(gitPath, `\n${filename.replace(outputFolder, '')}`);
}
