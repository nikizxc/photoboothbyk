import { ArrowRight, Camera } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function CaptureGuard() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 border border-dashed rounded-md flex flex-col gap-3 items-center justify-center p-10">
      <Camera className="md:size-10 size-8" />
      <h1 className="font-semibold md:text-xl text-base">
        No photos to customize
      </h1>
      <p className="text-muted-foreground md:w-100 w-full text-center md:text-base text-xs">
        You need to complete the capture process before you can customize your
        photobooth strip.
      </p>
      <Button variant="default" onClick={() => navigate("/studio")}>
        Start capturing <ArrowRight />
      </Button>
    </div>
  );
}
