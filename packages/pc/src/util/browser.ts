/**
 * Get current browser name.
 * @returns  browser name
 */
export const getBrowserName = (): string => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('firefox') > -1) return 'firefox';
  if (userAgent.indexOf('safari') > -1) return 'safari';
  if (userAgent.indexOf('opr') > -1) return 'opera';
  if (userAgent.indexOf('chrome') > -1) return 'chrome';
  if (userAgent.indexOf('trident') > -1) return 'ie 11';
  if (userAgent.indexOf('ie') > -1) return 'ie';
  return 'unknown';
}