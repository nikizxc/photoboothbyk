import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Camera } from "lucide-react";
import TimerSelect from "./TimerSelect";
import Webcam from "react-webcam";
import Settings from "./Settings";
import { Timer } from "@/services/timer.service";
import { Image } from "@/services/image.service";
import CustomizeFrameDialog from "./customize-frame/CustomizeFrameDialog";

const CameraSection = ({ shots, totalShots, onAddShot, onResetShot }: any) => {
  const cameraRef = useRef<Webcam>(null);
  const [isStreaming, setIsStreaming] = useState(true);

  const [timer, setTimer] = useState<number>(3);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [settings, setSettings] = useState({ flash: false, mirror: false });
  const [filter, setFilter] = useState("");
  const [flash, setFlash] = useState(false);

  const startTimer = async (selectedTimer: number) => {
    setIsTimerRunning(true);
    await Timer.start(timer, (count) => setTimer(count));
    setIsTimerRunning(false);
    setTimer(selectedTimer);
  };

  const triggerFlash = async () => {
    if (!settings.flash) return;
    setFlash(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setFlash(false);
        resolve();
      }, 150);
    });
  };

  const onCapture = async () => {
    if (!cameraRef.current || !cameraRef.current.video) return;
    for (let i = shots.length; i < totalShots; i++) {
      await startTimer(timer);

      const video = cameraRef.current.video;

      await triggerFlash();

      const image = await Image.capture(video, settings.mirror, filter);

      if (!image) return;
      onAddShot(image);
    }
  };

  const onRetake = () => {
    const isConfirmed = confirm(
      `Are you sure you want to retake ${totalShots} shots?`,
    );
    if (!isConfirmed) return;
    onResetShot();
  };

  const onTimerChange = (value: number) => {
    setTimer(value);
  };

  const onSettingsChange = (prop: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [prop]: value,
    }));
  };
  return (
    <div className="flex flex-col gap-3 h-full">
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

        {flash && (
          <div className="absolute inset-0 z-50 rounded-md bg-white pointer-events-none" />
        )}

        {!isStreaming && (
          <p className="flex items-center justify-center absolute inset-0 text-secondary-background-foreground font-semibold">
            Waiting for camera...
          </p>
        )}

        {isTimerRunning && (
          <div className="absolute inset-0 flex items-center justify-center ">
            <p className="w-30 h-30 flex items-center justify-center text-6xl text-white bg-background/20 rounded-full">
              {timer}
            </p>
          </div>
        )}
      </div>

      {shots.length !== totalShots ? (
        <div className="flex justify-between h-12">
          <div className="flex gap-2">
            <Settings settings={settings} onSettingsChange={onSettingsChange} />

            <TimerSelect onTimerChange={onTimerChange} />
          </div>
          <Button
            onClick={onCapture}
            disabled={!isStreaming}
            variant="default"
            className="h-full"
          >
            <Camera />
            Start
          </Button>
        </div>
      ) : (
        <div className="flex justify-end gap-2 h-12">
          <Button onClick={onRetake} variant="secondary" className="h-full ">
            <Camera />
            Retake
          </Button>
          <CustomizeFrameDialog />
        </div>
      )}
    </div>
  );
};

export default CameraSection;
