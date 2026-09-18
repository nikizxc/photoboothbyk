import { STICKER_OPTIONS } from "@/constants/sticker-options.constant";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Maximize2, RotateCw, Trash2 } from "lucide-react";
import type { StickerProp } from "@/types/sticker.type";
import Options from "./Options";
import { Fragment } from "react/jsx-runtime";

interface StickerSectionProps {
  addSticker: (src: string) => void;
  stickers: StickerProp[];
  onStickerChangeSize: (index: number, size: number) => void;
  onStickerRemove: (index: number) => void;
  onStickerRotate: (index: number, rotation: number) => void;
}

const StickerSection = ({
  addSticker,
  stickers,
  onStickerChangeSize,
  onStickerRemove,
  onStickerRotate,
}: StickerSectionProps) => {
  console.log(stickers);
  return (
    <div className="flex flex-col gap-3">
      <Label className="font-semibold">✨ Sticker (Max of 3)</Label>
      <div className="flex flex-wrap gap-3">
        {Object.values(STICKER_OPTIONS).map((value, index) => (
          <Fragment key={index}>
            <Options
              src={`/stickers/${value}`}
              onClick={() => addSticker(`/stickers/${value}`)}
              backgroundSize="100%"
            />
          </Fragment>
        ))}
      </div>
      <p className="text-muted-foreground text-xs">ADDED ({stickers.length})</p>

      {stickers.length === 0 && (
        <p className="text-muted-foreground text-xs">No added stickers yet.</p>
      )}
      {stickers?.map((sticker, index) => (
        <div key={index} className="flex gap-3 items-center">
          <img
            src={sticker.src}
            className="w-8 h-8 rounded-full ring-1 ring-black/5 shrink-0"
            alt={`sticker_${index}`}
          />

          <div className="flex items-center gap-1.5 flex-1">
            <Maximize2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <input
              type="range"
              min={30}
              max={100}
              value={sticker.size}
              className="w-full"
              onChange={(e) =>
                onStickerChangeSize(index, Number(e.target.value))
              }
              aria-label="Sticker size"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-1">
            <RotateCw className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <input
              type="range"
              min={0}
              max={360}
              value={sticker.rotation}
              className="w-full"
              onChange={(e) => onStickerRotate(index, Number(e.target.value))}
              aria-label="Sticker rotation"
            />
          </div>

          <Button
            variant="destructive"
            className="bg-transparent!"
            onClick={() => onStickerRemove(index)}
          >
            <Trash2 />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default StickerSection;
