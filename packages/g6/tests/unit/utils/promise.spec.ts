import { createPromise } from '../../../src/utils/promise';

describe('promise', () => {
  it('createPromise resolve', (done) => {
    const { promise, resolve } = createPromise<void>();

    promise.then(() => {
      done();
    });

    resolve();
  });

  it('createPromise resolve value', (done) => {
    const { promise, resolve } = createPromise<number>();

    promise.then((value) => {
      expect(value).toEqual(666);
      done();
    });

    resolve(666);
  });

  it('createPromise reject', (done) => {
    const { promise, reject } = createPromise<void>();

    promise.catch(() => {
      done();
    });

    reject();
  });
});
