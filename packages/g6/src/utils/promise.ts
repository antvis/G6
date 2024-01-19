/**
 * <zh/> 创建一个 Promise 对象
 *
 * <en/> Create a Promise object
 * @returns <zh/> { promise, resolve, reject } | <en/> { promise, resolve, reject }
 */
export function createPromise<T = unknown>() {
  let resolve: (value: T | PromiseLike<T>) => void;
  let reject: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}
