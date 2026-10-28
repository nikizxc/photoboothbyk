import type { LayoutProps } from "@/types/layout.type";
import { Fragment } from "react/jsx-runtime";
import StickerItem from "../customize-frame/StickerItem";
import { usePhotobooth } from "@/contexts/PhotoboothContext";
import LayoutLabel from "./LayoutLabel";

export const LayoutB = ({ frameRef }: LayoutProps) => {
  const { customization, shots } = usePhotobooth();
  const { selectedBg, selectedColor, label, stickers } = customization;
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

      {label?.isChecked && <LayoutLabel color={label.color} />}

      {stickers?.map((sticker, index) => (
        <Fragment key={index}>
          <StickerItem sticker={sticker} />
        </Fragment>
      ))}
    </div>
  );
};
