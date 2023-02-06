

export interface LayoutCommonConfig {
  type?: string;
  gpuEnabled?: boolean;
  workerEnabled?: boolean;
  // Works when workerEnabled is true, config it with a visitable url to avoid visiting online version.
  workerScriptURL?: string;
}