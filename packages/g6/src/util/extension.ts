import { isFunction } from '@antv/util';
import { StdLibCategory } from '../types/stdlib';

/**
 * Get one extension from a (std)lib.
 * @param config extension's config
 * @param lib any lib
 * @param {StdLibCategory} cat category of the extension
 * @returns
 */
export const getExtension = (config: string | Function | object, lib, cat: StdLibCategory) => {
  const catKey = `${cat}s`;
  // TODO: whether keep function type config?
  if (isFunction(config)) {
    return config;
  }
  const type = typeof config === 'string' ? config : (config as any).type;
  const ext = lib[catKey]?.[type];
  return ext;
};

export const getCatExtensions = (lib, cat: StdLibCategory) => {
  const catKey = `${cat}s`;
  return lib[catKey];
};
