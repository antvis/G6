/**
 * Simplified from https://github.com/zertosh/invariant.
 */
const BRAND = 'G6';

function getMessage(message: string) {
  return `${BRAND}: ${message}`;
}

/**
 * invariant error.
 */
export function invariant(message: string): void {
  const error = new Error(getMessage(message));
  error.name = BRAND;
  // error.framesToPop = 1; // we don't care about invariant's own frame
  throw error;
}

/**
 * info message in console.
 */
export function info(message: string): void {
  console.warn(getMessage(message));
}

/**
 * warn message in console.
 */
export function warn(message: string) {
  console.warn(getMessage(message));
}

/**
 * error message in console.
 */
export function error(message: string) {
  console.error(getMessage(message));
}
