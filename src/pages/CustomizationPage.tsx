import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileImage, Film } from "lucide-react";
import { usePhotobooth } from "@/contexts/PhotoboothContext";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";

import LabelSection from "@/components/customize-frame/LabelSection";
import BackgroundSection from "@/components/customize-frame/BackgroundSection";
import StickerSection from "@/components/customize-frame/StickerSection";
import { useNavigate } from "react-router-dom";
import CaptureGuard from "@/components/CaptureGuard";
import Loading from "@/components/Loading";

export default function CustomizationPage() {
  const {
    shots,
    selectedLayout,
    customization,
    onBackgroundChange,
    onLabelChange,
    onStickerAdd,
    onStickerChangeSize,
    onStickerRotate,
    onStickerRemove,
  } = usePhotobooth();
  const [isLoading, setIsLoading] = useState(false);

  if (shots.length === 0 && !selectedLayout) {
    return <CaptureGuard />;
  }

  const frameRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [blob, setBlob] = useState<Blob | null>(null);

  const Component = selectedLayout?.frame;

  useEffect(() => {
    if (!frameRef.current) return;

    let cancelled = false;
    (async () => {
      const canvas = await html2canvas(frameRef.current!, {
        scale: 1.5,
        backgroundColor: "#000000",
      });
      const b = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );

      if (!cancelled) setBlob(b);
    })();

    return () => {
      cancelled = true;
    };
  }, [shots, customization]);

  const onDownloadGIF = async () => {
    if (!frameRef.current) return;

    setIsLoading(true);
    try {
      const imgsEl: NodeListOf<HTMLImageElement> =
        frameRef.current.querySelectorAll("img[data-type=shot]");

      const gif = new GIF({
        workers: 2,
        quality: 10,
        workerScript: "/gif.worker.js",
      });

      const canvas = document.createElement("canvas");

      const first = imgsEl[0];
      canvas.width = first.naturalWidth;
      canvas.height = first.naturalHeight;

      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      imgsEl.forEach((img) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        gif.addFrame(canvas, { delay: 700, copy: true });
      });

      gif.on("finished", function (blob) {
        const randomId = Math.random().toString(36).slice(2, 10);

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `strip-${randomId}.gif`;
        link.click();
        setIsLoading(false);
      });

      gif.render();
    } catch (error) {
      console.error(error);
    }
  };

  const onDownloadPNG = async () => {
    if (!blob) return;

    const randomId = Math.random().toString(36).slice(2, 10);
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `strip-${randomId}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <>
      <Card className="flex-1 md:py-10 relative">
        <Button
          variant="ghost"
          className="w-fit md:absolute left-5 top-5"
          onClick={() => navigate("/studio", { state: "start-capturing" })}
        >
          <ArrowLeft className="size-5" />
        </Button>
        <CardHeader className="flex justify-center">
          <CardTitle className=" text-center md:text-3xl text-xl font-bright-kenly border border-secondary border-dashed w-fit p-3 rounded-full">
            Customize your photobooth strip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex md:flex-row flex-col gap-4 h-full min-h-0">
            <div className="flex-1 flex justify-center items-start overflow-hidden">
              {Component && <Component frameRef={frameRef} />}
            </div>

            <div className="flex-1 flex flex-col gap-6 overflow-y-auto p-2">
              <BackgroundSection onBackgroundChange={onBackgroundChange} />
              <LabelSection
                onLabelChange={onLabelChange}
                label={customization.label}
              />
              <StickerSection
                addSticker={onStickerAdd}
                stickers={customization.stickers}
                onStickerChangeSize={onStickerChangeSize}
                onStickerRemove={onStickerRemove}
                onStickerRotate={onStickerRotate}
              />
              <div className="flex gap-3 ml-auto mt-auto">
                <Button
                  variant="default"
                  className="w-25 "
                  onClick={onDownloadGIF}
                >
                  <Film className="size-4" />
                  GIF
                </Button>
                <Button
                  variant="default"
                  className="w-25"
                  onClick={onDownloadPNG}
                >
                  <FileImage className="size-4" />
                  PNG
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {isLoading && <Loading />}
    </>
  );
}
