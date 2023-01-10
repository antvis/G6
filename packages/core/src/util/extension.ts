import { isFunction } from "util";
import { StdLibCategory } from "../types/stdlib";


/**
 * Get one extension from a (std)lib.
 * @param config extension's config
 * @param lib any lib
 * @param {StdLibCategory} cat category of the extension
 * @returns 
 */
export const getExtension = (config: string | Function | object, lib, cat: StdLibCategory) => {
  // TODO: whether keep function type config?
  if (isFunction(config)) {
    return config;
  }
  if (typeof config === 'string') {
    return lib[cat]?.[config]
  }
  return lib[cat]?.[config.type];
};