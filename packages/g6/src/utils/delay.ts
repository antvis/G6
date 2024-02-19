/**
 * <zh/> 延迟一段时间
 * <en/> delay a period of time
 * @param timeout - <zh/> 延迟时间 | <en/> delay time
 * @returns - <zh/> Promise<void> | <en/> Promise<void>
 */
export function delay(timeout: number = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
