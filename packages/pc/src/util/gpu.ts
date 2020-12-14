/**
 * 调用 gpuDetector.webgl 判断当前浏览器是否支持 webgl。（支持 gpgpu 的浏览器一定也支持 webgl）
 */
export const gpuDetector = (): any => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return {};
  return {
    canvas: !!window.CanvasRenderingContext2D,
    webgl: (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      } catch (e) {
        return false;
      }
    })(),
    workers: !!window.Worker,
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,
    getWebGLErrorMessage() {
      const element = document.createElement('div');
      element.id = 'webgl-error-message';
      element.style.fontFamily = 'monospace';
      element.style.fontSize = '13px';
      element.style.fontWeight = 'normal';
      element.style.textAlign = 'center';
      element.style.background = '#fff';
      element.style.color = '#000';
      element.style.padding = '1.5em';
      element.style.width = '400px';
      element.style.margin = '5em auto 0';
      if (!this.webgl) {
        element.innerHTML = window.WebGLRenderingContext
          ? [
              'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" rel="external nofollow" rel="external nofollow" style="color:#000">WebGL</a>.<br />',
              'Find out how to get it <a href="http://get.webgl.org/" rel="external nofollow" rel="external nofollow" style="color:#000">here</a>.',
            ].join('\n')
          : [
              'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" rel="external nofollow" rel="external nofollow" style="color:#000">WebGL</a>.<br/>',
              'Find out how to get it <a href="http://get.webgl.org/" rel="external nofollow" rel="external nofollow" style="color:#000">here</a>.',
            ].join('\n');
      }
      return element;
    },
    addGetWebGLMessage(parameters) {
      parameters = parameters || {};
      const parent = parameters.parent !== undefined ? parameters.parent : document.body;
      const id = parameters.id !== undefined ? parameters.id : 'oldie';
      const element = gpuDetector().getWebGLErrorMessage();
      element.id = id;
      parent.appendChild(element);
    },
  };
};
