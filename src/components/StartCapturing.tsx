import ShotsSection from "./ShotsSection";
import CameraSection from "./CameraSection";

const StartCapturing = () => {
  return (
    <>
      <p className="text-muted-foreground md:text-base text-sm text-center">
        you may now begin capturing photos or upload images from your device
      </p>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <CameraSection />
        <ShotsSection />
      </div>
    </>
  );
};

export default StartCapturing;
