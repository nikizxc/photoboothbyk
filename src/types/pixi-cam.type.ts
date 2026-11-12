import type { Application, Sprite } from "pixi.js";
import type Webcam from "react-webcam";

export type PixiCamProps = {
  filter: string;
  webcamRef: React.RefObject<Webcam | null>;
  appRef: React.RefObject<Application | null>;
  flash: boolean;
  spriteRef: React.RefObject<Sprite | null>;
  countdown: number;
  isTimerRunning: boolean;
  isStreaming: boolean;
  setIsStreaming: React.Dispatch<React.SetStateAction<boolean>>;
};
