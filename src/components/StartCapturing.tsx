import { useState } from "react";

import ShotsSection from "./ShotsSection";
import CameraSection from "./CameraSection";

const StartCapturing = ({ layoutId, totalShots }: any) => {
  const [shots, setShots] = useState<string[]>([]);

  const onAddShot = (image: string) => {
    setShots((prev) => [...prev, image]);
  };

  const onResetShot = () => {
    setShots([]);
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full gap-6">
        <p className="text-muted-foreground">
          you may now begin capturing photos or upload images from your device
        </p>
        <div className="flex gap-6 h-125">
          <CameraSection
            shots={shots}
            layoutId={layoutId}
            totalShots={totalShots}
            onAddShot={onAddShot}
            onResetShot={onResetShot}
          />
          <ShotsSection shots={shots} totalShots={totalShots} />
        </div>
      </div>
    </>
  );
};

export default StartCapturing;
