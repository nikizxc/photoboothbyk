import ShotsSection from "./ShotsSection";
import CameraSection from "./CameraSection";
import { usePhotobooth } from "@/contexts/PhotoboothContext";

const StartCapturing = () => {
  const { shots, setShots, selectedLayout } = usePhotobooth();

  const onAddShot = (image: string) => {
    setShots((prev) => [...prev, image]);
  };

  const onResetShot = () => {
    setShots([]);
  };

  const onRemoveShot = (index: number) => {
    const isConfirmed = confirm("Are you sure you want to remove this shot?");
    if (!isConfirmed) return;
    setShots((prev) => prev.filter((_, i) => i !== index));
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
            totalShots={selectedLayout?.shots ?? 0}
            onAddShot={onAddShot}
            onResetShot={onResetShot}
          />
          <ShotsSection
            shots={shots}
            totalShots={selectedLayout?.shots ?? 0}
            onAddShot={onAddShot}
            onRemoveShot={onRemoveShot}
          />
        </div>
      </div>
    </>
  );
};

export default StartCapturing;
