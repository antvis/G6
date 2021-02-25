export default class WebWorker {
  constructor(worker: WebWorker, workerScirptURL: string) {
    const code = worker.toString();
    const scriptURL = `const workerScirptURL = '${workerScirptURL}';`;

    const blob = new Blob([`${scriptURL}(${code})()`], { type: 'text/javascript' });
    return new Worker(URL.createObjectURL(blob));
  }
}
