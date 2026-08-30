import { CircleCheck } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import LabelSection from "./LabelSection";
import BackgroundSection from "./BackgroundSection";
import StickerSection from "./StickerSection";
import type { StickerProp } from "@/types/sticker.type";
import html2canvas from "html2canvas";

const CustomizeFrameDialog = ({ layoutId, shots }: any) => {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    "#000000",
  );
  const [selectedBg, setSelectedBg] = useState<string | undefined>(undefined);
  const [label, setLabel] = useState({
    isChecked: true,
    color: "#FFFFFF",
  });
  const [stickers, setStickers] = useState<StickerProp[]>([]);
  const frameRef = useRef<HTMLDivElement>(null);

  const Component = layoutId;

  const onBackgroundChange = (value: string, type: string) => {
    if (type === "color") {
      setSelectedBg(undefined);
      setSelectedColor(value);
    } else {
      setSelectedColor(undefined);
      setSelectedBg(value);
    }
  };

  const onLabelChange = (prop: string, value: string) => {
    setLabel((prev) => ({
      ...prev,
      [prop]: JSON.parse(value),
    }));
  };

  const addSticker = (src: string) => {
    if (stickers.length === 3) {
      alert("You can only add up to 3 stickers.");
      return;
    }
    const newSticker: StickerProp = {
      src,
      x: 0,
      y: 0,
      size: 50,
      rotation: 0,
    };

    setStickers((prev) => [...prev, newSticker]);
  };

  const onStickerChangeSize = (index: number, size: number) => {
    setStickers((prev) =>
      prev.map((sticker, i) => (i === index ? { ...sticker, size } : sticker)),
    );
  };

  const onStickerRotate = (index: number, rotation: number) => {
    setStickers((prev) =>
      prev.map((sticker, i) =>
        i === index ? { ...sticker, rotation } : sticker,
      ),
    );
  };

  const onStickerRemove = (index: number) => {
    setStickers((prev) => prev.filter((_, i) => i !== index));
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
            <Component
              shots={shots}
              selectedBg={selectedBg}
              selectedColor={selectedColor}
              label={label}
              stickers={stickers}
              frameRef={frameRef}
            />
          </div>

          <div className="flex-1 flex flex-col py-10 gap-6 overflow-y-auto px-2">
            <BackgroundSection onBackgroundChange={onBackgroundChange} />
            <LabelSection onLabelChange={onLabelChange} label={label} />
            <StickerSection
              addSticker={addSticker}
              stickers={stickers}
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
