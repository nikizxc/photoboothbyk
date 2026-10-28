import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { usePhotobooth } from "@/contexts/PhotoboothContext";
import html2canvas from "html2canvas";
import { useRef } from "react";

import LabelSection from "@/components/customize-frame/LabelSection";
import BackgroundSection from "@/components/customize-frame/BackgroundSection";
import StickerSection from "@/components/customize-frame/StickerSection";
import { useLocation, useNavigate } from "react-router-dom";
import CaptureGuard from "@/components/CaptureGuard";

export default function CustomizationPage() {
  const status = useLocation().state;

  if (!status) {
    return <CaptureGuard />;
  }
  const {
    selectedLayout,
    customization,
    onBackgroundChange,
    onLabelChange,
    onStickerAdd,
    onStickerChangeSize,
    onStickerRotate,
    onStickerRemove,
  } = usePhotobooth();

  const frameRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const Component = selectedLayout?.frame;

  const onDone = async () => {
    if (!frameRef.current) return;

    const imgs = Array.from(frameRef.current.querySelectorAll("img"));

    await Promise.all(
      imgs.map((img) => {
        if (img.complete) return Promise.resolve();

        return new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
      }),
    );

    const canvas = await html2canvas(frameRef.current, {
      scale: 2,
      backgroundColor: "#000000",
    });
    const dataURL = canvas.toDataURL("image/png");

    const randomId = Math.random().toString(36).slice(2, 10);

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `strip-${randomId}.png`;
    link.click();
  };
  return (
    <Card className="flex-1 py-10 relative">
      <Button
        variant="ghost"
        className="w-fit absolute left-5 top-5"
        onClick={() => navigate("/studio", { state: "start-capturing" })}
      >
        <ArrowLeft className="size-5" />
      </Button>
      <CardHeader className="flex justify-center">
        <CardTitle className=" text-center text-3xl font-bright-kenly border border-secondary border-dashed w-fit p-3 rounded-full">
          Customize your photobooth strip
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 h-full min-h-0">
          <div className="flex-1 flex justify-center items-center overflow-hidden scale-90">
            {Component && <Component frameRef={frameRef} />}
          </div>

          <div className="flex-1 flex flex-col gap-6 overflow-y-auto p-2 mt-10">
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
              <Button variant="default" className="w-25 ">
                <Download className="size-4" />
                GIF
              </Button>
              <Button variant="default" className="w-25">
                <Download className="size-4" />
                PNG
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
