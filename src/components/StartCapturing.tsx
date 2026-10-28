import ShotsSection from "./ShotsSection";
import CameraSection from "./CameraSection";

const StartCapturing = () => {
  return (
    <>
      <p className="text-muted-foreground">
        you may now begin capturing photos or upload images from your device
      </p>
      <div className="flex gap-6 h-125">
        <CameraSection />
        <ShotsSection />
      </div>
    </>
  );
};

export default StartCapturing;
