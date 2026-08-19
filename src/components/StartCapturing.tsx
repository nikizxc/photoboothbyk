import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Camera } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import html2canvas from "html2canvas";

const items = [
  {
    label: "3s",
    value: 3,
  },

  {
    label: "5s",
    value: 5,
  },
  {
    label: "10s",
    value: 10,
  },
];

const StartCapturing = ({ layoutId, totalShots }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasFrameRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [shots, setShots] = useState<string[]>([]);
  const [timer, setTimer] = useState<number>(3);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const Component = layoutId;

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "user",
        },
        audio: false,
      })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsStreaming(true);
      })
      .catch((error) => {
        console.error("Camera error", error);
        setIsStreaming(false);
      });
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
        streamRef.current = null;
      }
    };
  }, []);

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
    for (let i = 0; i < totalShots; i++) {
      await startTimer();

      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (!canvas || !video) return;

      const ctx = canvas.getContext("2d");

      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      const image = canvas.toDataURL("image/png");

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
      <div className="flex flex-col justify-center items-center w-full gap-6">
        <p className="text-muted-foreground">
          you may now begin capturing photos or upload images from your device
        </p>
        <div className="flex gap-6">
          <div className="flex flex-col gap-3">
            <div
              className={`w-125 h-125 rounded-md bg-primary p-1.5 relative `}
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className={`w-full h-full object-cover ${isStreaming ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
              />
              {!isStreaming && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-primary-foreground">
                    Waiting for camera...
                  </p>
                </div>
              )}

              {isTimerRunning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white text-8xl">{timer}</p>
                </div>
              )}
            </div>

            <canvas
              ref={canvasRef}
              className="hidden"
              width={500}
              height={500}
            />

            <div className="flex gap-3 h-12">
              {shots.length !== totalShots ? (
                <>
                  <Button
                    onClick={onCapture}
                    variant="secondary"
                    className="h-full"
                  >
                    <Camera className="size-7" />
                  </Button>
                  <Select
                    items={items}
                    defaultValue={3}
                    onValueChange={(value) => {
                      if (value != null) setTimer(Number(value));
                    }}
                  >
                    <SelectTrigger className="text-lg h-full!">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {items.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </>
              ) : (
                <>
                  <Button
                    onClick={onRetake}
                    variant="secondary"
                    className="h-full"
                  >
                    Retake
                  </Button>
                  <Button
                    onClick={onDone}
                    variant="secondary"
                    className="h-full"
                  >
                    Done
                  </Button>
                </>
              )}
            </div>
          </div>
          <Card className="h-125 w-60">
            <CardContent className="flex h-full flex-col gap-3">
              <p className="shrink-0 text-center font-bold">
                shots {shots.length}/{totalShots}
              </p>

              <div className="flex min-h-0 flex-1 flex-col items-center gap-3 overflow-y-auto">
                {shots.map((shot, index) => (
                  <div key={index} className="shrink-0">
                    <img
                      src={shot}
                      className="h-40 w-40 object-cover"
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
      <div ref={frameRef} className="absolute top-[-9999px] left-[-9999px] ">
        <Component shots={shots} />
      </div>
    </>
  );
};

export default StartCapturing;
