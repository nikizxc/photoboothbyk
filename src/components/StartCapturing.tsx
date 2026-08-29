import { useRef, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Camera } from "lucide-react";

import html2canvas from "html2canvas";
import TimerSelect from "./TimerSelect";
import Webcam from "react-webcam";
import Settings from "./Settings";
import { Timer } from "@/services/timer.service";
import { Image } from "@/services/image.service";
import CustomizeFrameDialog from "./CustomizeFrameDialog";

const StartCapturing = ({ layoutId, totalShots }: any) => {
  const cameraRef = useRef<Webcam>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasFrameRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(true);
  const [shots, setShots] = useState<string[]>([]);
  const [timer, setTimer] = useState<number>(3);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const Component = layoutId;

  const [settings, setSettings] = useState({ flash: false, mirror: false });
  const [filter, setFilter] = useState("");

  const startTimer = async (selectedTimer: number) => {
    setIsTimerRunning(true);
    await Timer.start(timer, (count) => setTimer(count));
    setIsTimerRunning(false);
    setTimer(selectedTimer);
  };

  const onCapture = async () => {
    if (!cameraRef.current || !cameraRef.current.video) return;
    for (let i = 0; i < totalShots; i++) {
      await startTimer(timer);

      const video = cameraRef.current.video;

      const image = Image.capture(video, settings.mirror, filter);
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
                mirrored={settings.mirror}
                audio={false}
                ref={cameraRef}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover"
                onUserMediaError={() => {
                  console.error("Camera not found");
                  setIsStreaming(false);
                }}
                style={{
                  filter: "",
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

            {shots.length !== totalShots ? (
              <div className="flex justify-between h-12">
                <div className="flex gap-2">
                  <Settings settings={settings} setSettings={setSettings} />

                  <TimerSelect setTimer={setTimer} />
                </div>
                <Button
                  onClick={onCapture}
                  variant="default"
                  className="h-full"
                >
                  <Camera strokeWidth={3} />
                  Start
                </Button>
              </div>
            ) : (
              <div className="flex justify-end gap-2 h-12">
                <Button
                  onClick={onRetake}
                  variant="secondary"
                  className="h-full "
                >
                  <Camera strokeWidth={3} />
                  Retake
                </Button>
                <CustomizeFrameDialog layoutId={layoutId} shots={shots} />
              </div>
            )}
          </div>
          <Card className="h-125 w-60">
            <CardContent className="flex h-full flex-col gap-3">
              <p className="shrink-0 text-center font-semibold">
                shots {shots.length}/{totalShots}
              </p>

              <div className="flex min-h-0 flex-1 flex-col items-center gap-3 overflow-y-auto">
                {Array.from({ length: totalShots }).map((_, index) => (
                  <div
                    key={index}
                    className="w-40 border-dashed border min-h-30"
                  >
                    {shots[index] && (
                      <img
                        src={shots[index]}
                        className="w-full h-full object-cover"
                        alt={`Shot ${index + 1}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <canvas ref={canvasFrameRef} className="hidden" />
      <div ref={frameRef} className="absolute top-[-99999px] left-[-99999px]">
        <Component shots={shots} />
      </div>
    </>
  );
};

export default StartCapturing;
