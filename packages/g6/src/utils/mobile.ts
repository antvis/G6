/**
 * <zh/> 判断是否为移动设备
 *
 * <en/> Judge whether it is a mobile device
 * @returns <zh/> 是否为移动设备 | <en/> whether it is a mobile device
 */
export function isMobileDevice(): boolean {
  const userAgent = navigator.userAgent;
  const mobilePattern = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return mobilePattern.test(userAgent);
}
