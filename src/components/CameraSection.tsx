import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Camera, CircleCheck } from "lucide-react";
import Webcam from "react-webcam";
import Settings from "./Settings";
import { Timer } from "@/services/timer.service";

import { usePhotobooth } from "@/contexts/PhotoboothContext";
import { useNavigate } from "react-router-dom";
import PixiCam from "./PixiCam";
import { ColorMatrixFilter, type Application, type Sprite } from "pixi.js";
import { useSettings } from "@/contexts/SettingsContext";
import FilterOptions from "./FilterOptions";

const CameraSection = () => {
  const { getShotsCount, selectedLayout, onAddShot, onResetShot } =
    usePhotobooth();
  const webcamRef = useRef<Webcam>(null);
  const appRef = useRef<Application | null>(null);
  const spriteRef = useRef<Sprite | null>(null);
  const [isStreaming, setIsStreaming] = useState(true);

  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const { timer, isFlashEnabled } = useSettings();
  const [filter, setFilter] = useState("none");
  const [flash, setFlash] = useState(false);
  const totalShots = selectedLayout?.shots ?? 0;
  const [countdown, setCountdown] = useState(3);

  const navigate = useNavigate();

  useEffect(() => {
    if (timer) {
      setCountdown(timer);
    }
  }, [timer]);

  const startTimer = async () => {
    setIsTimerRunning(true);
    await Timer.start(timer, (count) => setCountdown(count));
    setIsTimerRunning(false);
    setCountdown(timer);
  };

  const onCapture = async () => {
    const app = appRef.current;
    const sprite = spriteRef.current;
    if (!app || !sprite) return;

    const originalFilters = [...sprite.filters];
    const bright = new ColorMatrixFilter();
    bright.brightness(1.5, false);

    for (let i = getShotsCount(); i < totalShots; i++) {
      try {
        await startTimer();

        if (isFlashEnabled) {
          setFlash(true);
          sprite.filters = [...originalFilters, bright];
          app.render();
        }

        const dataUrl = await app.renderer.extract.base64(app.stage);

        onAddShot(i, dataUrl);
      } catch (error) {
        console.error(error);
        break;
      } finally {
        if (isFlashEnabled) {
          sprite.filters = originalFilters;
          setFlash(false);
        }
      }
    }
    bright.destroy();
  };

  const onRetake = () => {
    const isConfirmed = confirm(
      `Are you sure you want to retake ${totalShots} shots?`,
    );
    if (!isConfirmed) return;
    onResetShot();
  };

  const onFilterChange = (key: string) => {
    setFilter(key);
  };

  return (
    <section
      aria-label="Camera"
      className="flex w-full min-w-0 max-w-2xl flex-col gap-3 xl:w-2xl"
    >
      <PixiCam
        filter={filter}
        webcamRef={webcamRef}
        appRef={appRef}
        spriteRef={spriteRef}
        flash={flash}
        countdown={countdown}
        isTimerRunning={isTimerRunning}
        isStreaming={isStreaming}
        setIsStreaming={setIsStreaming}
      />

      {getShotsCount() !== totalShots ? (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="h-12 w-full min-w-0 md:flex-1">
            <FilterOptions onFilterChange={onFilterChange} />
          </div>

          <div className="flex h-12 w-full gap-3 md:w-auto md:flex-none">
            <Settings />
            <Button
              onClick={onCapture}
              disabled={!isStreaming}
              variant="default"
              className="h-full flex-1 md:flex-none"
            >
              <Camera />
              Capture
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-end gap-2 h-12">
          <Button onClick={onRetake} variant="secondary" className="h-full ">
            <Camera />
            Retake
          </Button>
          <Button
            variant="default"
            onClick={() => navigate("/studio/customization")}
            className="h-full"
          >
            <CircleCheck />
            Done
          </Button>
        </div>
      )}
    </section>
  );
};

export default CameraSection;
