/**
 * 在 jest 中使用 setTimeout 功能
 * @param callback 回调函数
 * @param time 延迟的时间
 */
export const timerOut = (callback, time = 50) => {
  setTimeout(() => {
    callback();
  }, time);
};
