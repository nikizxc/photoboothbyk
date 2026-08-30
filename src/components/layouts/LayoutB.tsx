import type { LayoutProps } from "@/types/layout.type";
import { Fragment } from "react/jsx-runtime";
import StickerItem from "../customize-frame/StickerItem";

export const LayoutB = ({
  frameRef,
  shots,
  selectedBg,
  selectedColor,
  label,
  stickers,
}: LayoutProps) => {
  return (
    <div
      ref={frameRef}
      className="grid grid-rows-4 gap-1 relative"
      style={{
        width: "2in",
        height: "6in",
        padding: "5px",
        ...(selectedBg && {
          backgroundImage: `url("/backgrounds/${selectedBg}")`,
        }),
        ...(selectedColor && {
          backgroundColor: selectedColor,
        }),
      }}
    >
      {shots.map((image: string, i: number) => (
        <div key={i} className="w-full h-full overflow-hidden">
          <img src={image} className="w-full h-full object-cover" />
        </div>
      ))}

      {label?.isChecked && (
        <p
          className="text-center font-bold text-[10px] tracking-wide shrink-0 pt-1"
          style={{ color: label.color }}
        >
          photoboothbyk
        </p>
      )}

      {stickers?.map((sticker, index) => (
        <Fragment key={index}>
          <StickerItem sticker={sticker} />
        </Fragment>
      ))}
    </div>
  );
};
