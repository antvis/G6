export function sleep(time: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(null);
      }, time);
    });
  }