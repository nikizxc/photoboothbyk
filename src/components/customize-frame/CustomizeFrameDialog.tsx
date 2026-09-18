import { CircleCheck } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { useRef } from "react";
import LabelSection from "./LabelSection";
import BackgroundSection from "./BackgroundSection";
import StickerSection from "./StickerSection";
import type { StickerProp } from "@/types/sticker.type";
import html2canvas from "html2canvas";
import { usePhotobooth } from "@/contexts/PhotoboothContext";

type LabelProps =
  | { prop: "isChecked"; value: boolean }
  | { prop: "color"; value: string };

const CustomizeFrameDialog = () => {
  const { selectedLayout, customization, setCustomization } = usePhotobooth();

  const frameRef = useRef<HTMLDivElement>(null);

  const Component = selectedLayout?.frame;

  const onBackgroundChange = (value: string, type: string) => {
    setCustomization((prev) => ({
      ...prev,
      selectedColor: type === "color" ? value : undefined,
      selectedBg: type === "bg" ? value : undefined,
    }));
  };

  const onLabelChange = ({ prop, value }: LabelProps) => {
    setCustomization((prev) => ({
      ...prev,
      label: { ...customization.label, [prop]: value },
    }));
  };

  const addSticker = (src: string) => {
    if (customization.stickers.length === 3) {
      alert("You can only add up to 3 stickers.");
      return;
    }
    const newSticker: StickerProp = {
      src,
      size: 50,
      rotation: 0,
    };

    setCustomization((prev) => ({
      ...prev,
      stickers: [...customization.stickers, newSticker],
    }));
  };

  const onStickerChangeSize = (index: number, size: number) => {
    const updatedStickers = customization.stickers.map((sticker, i) =>
      i === index ? { ...sticker, size } : sticker,
    );
    setCustomization((prev) => ({
      ...prev,
      stickers: updatedStickers,
    }));
  };

  const onStickerRotate = (index: number, rotation: number) => {
    const updatedStickers = customization.stickers.map((sticker, i) =>
      i === index ? { ...sticker, rotation } : sticker,
    );
    setCustomization((prev) => ({
      ...prev,
      stickers: updatedStickers,
    }));
  };

  const onStickerRemove = (index: number) => {
    const updatedStickers = customization.stickers.filter(
      (_, i) => i !== index,
    );
    setCustomization((prev) => ({
      ...prev,
      stickers: updatedStickers,
    }));
  };

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
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="default" className="h-full">
            <CircleCheck strokeWidth={3} />
            Done
          </Button>
        }
      />
      <DialogContent className="max-w-5xl! h-160">
        <div className="flex gap-4 h-full min-h-0">
          <div className="flex-1 flex justify-center items-center overflow-hidden scale-90">
            {Component && <Component frameRef={frameRef} />}
          </div>

          <div className="flex-1 flex flex-col py-10 gap-6 overflow-y-auto px-2">
            <BackgroundSection onBackgroundChange={onBackgroundChange} />
            <LabelSection
              onLabelChange={onLabelChange}
              label={customization.label}
            />
            <StickerSection
              addSticker={addSticker}
              stickers={customization.stickers}
              onStickerChangeSize={onStickerChangeSize}
              onStickerRemove={onStickerRemove}
              onStickerRotate={onStickerRotate}
            />
            <Button
              variant="default"
              className="w-fit ml-auto mt-auto"
              onClick={onDone}
            >
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizeFrameDialog;
