// src/global.d.ts
interface GIFOptions {
  workers?: number;
  quality?: number;
  workerScript?: string;
  width?: number;
  height?: number;
  repeat?: number;
  background?: string;
  transparent?: string | null;
  dither?: boolean | string;
  debug?: boolean;
}

interface GIFFrameOptions {
  delay?: number;
  copy?: boolean;
  dispose?: number;
}

declare class GIF {
  constructor(options?: GIFOptions);
  addFrame(
    image: CanvasImageSource | CanvasRenderingContext2D | ImageData,
    options?: GIFFrameOptions,
  ): void;
  on(event: "finished", cb: (blob: Blob) => void): this;
  on(event: "progress", cb: (progress: number) => void): this;
  on(event: "start" | "abort", cb: () => void): this;
  render(): void;
  abort(): void;
  running: boolean;
}
