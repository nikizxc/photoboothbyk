import { useRef, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Camera, CircleCheck } from "lucide-react";

import html2canvas from "html2canvas";
import TimerSelect from "./TimerSelect";
import Webcam from "react-webcam";

const StartCapturing = ({ layoutId, totalShots }: any) => {
  const cameraRef = useRef<Webcam>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasFrameRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(true);
  const [shots, setShots] = useState<string[]>([]);
  const [timer, setTimer] = useState<number>(3);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const Component = layoutId;

  const startTimer = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (timerRef.current) reject();
      let currentTimer = timer;
      let count = timer;
      setIsTimerRunning(true);
      timerRef.current = setInterval(() => {
        count--;
        setTimer(count);

        if (count === 0) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          setTimer(currentTimer);
          setIsTimerRunning(false);
          resolve();
        }
      }, 1000);
    });
  };

  const onCapture = async () => {
    if (!cameraRef.current) return;
    for (let i = 0; i < totalShots; i++) {
      await startTimer();

      const image = cameraRef.current.getScreenshot();
      if (!image) return;

      setShots((prev) => [...prev, image]);
    }
  };

  const onDone = async () => {
    if (!frameRef.current) return;
    const canvas = await html2canvas(frameRef.current, {
      scale: 4,
      backgroundColor: "#000000",
    });
    const dataURL = canvas.toDataURL("image/png");

    const randomId = Math.random().toString(36).slice(2, 10);

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `strip-${randomId}.png`;
    link.click();
  };

  const onRetake = () => {
    const isConfirmed = confirm(
      `Are you sure you want to retake ${totalShots} shots?`,
    );
    if (!isConfirmed) return;
    setShots([]);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full gap-6 ">
        <p className="text-muted-foreground">
          you may now begin capturing photos or upload images from your device
        </p>
        <div className="flex gap-6 h-125">
          <div className="flex flex-col gap-3 h-full ">
            <div className="rounded-md p-3 w-150 flex-1 min-h-0 bg-secondary-background relative">
              <Webcam
                audio={false}
                ref={cameraRef}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover"
                onUserMediaError={() => {
                  console.error("Camera not found");
                  setIsStreaming(false);
                }}
              />

              {!isStreaming && (
                <p className="flex items-center justify-center absolute inset-0 text-secondary-background-foreground font-semibold">
                  Waiting for camera...
                </p>
              )}

              {isTimerRunning && (
                <p className="absolute inset-0 flex items-center justify-center text-white text-8xl">
                  {timer}
                </p>
              )}
            </div>

            <div className="flex gap-3 h-12">
              {shots.length !== totalShots ? (
                <>
                  <Button
                    onClick={onCapture}
                    variant="default"
                    className="h-full"
                  >
                    <Camera strokeWidth={3} />
                    Start
                  </Button>
                  <TimerSelect setTimer={setTimer} />
                </>
              ) : (
                <>
                  <Button
                    onClick={onRetake}
                    variant="secondary"
                    className="h-full "
                  >
                    <Camera strokeWidth={3} />
                    Retake
                  </Button>
                  <Button onClick={onDone} variant="default" className="h-full">
                    <CircleCheck strokeWidth={3} />
                    Done
                  </Button>
                </>
              )}
            </div>
          </div>
          <Card className="h-125 w-60">
            <CardContent className="flex h-full flex-col gap-3">
              <p className="shrink-0 text-center font-semibold">
                shots {shots.length}/{totalShots}
              </p>

              <div className="flex min-h-0 flex-1 flex-col items-center gap-3 overflow-y-auto">
                {shots.map((shot, index) => (
                  <div key={index}>
                    <img
                      src={shot}
                      className="w-40"
                      alt={`Shot ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <canvas ref={canvasFrameRef} className="hidden" />
      <div ref={frameRef} className="absolute top-[-9999px] left-[-9999px]">
        <Component shots={shots} />
      </div>
    </>
  );
};

export default StartCapturing;
