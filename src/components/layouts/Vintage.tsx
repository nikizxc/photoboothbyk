import { usePhotobooth } from "@/contexts/PhotoboothContext";
import type { LayoutProps } from "@/types/layout.type";
import { Fragment } from "react/jsx-runtime";
import StickerItem from "../customize-frame/StickerItem";
import LayoutLabel from "./LayoutLabel";

export const Vintage = ({ frameRef }: LayoutProps) => {
  const { customization, shots } = usePhotobooth();
  const { selectedBg, selectedColor, label, stickers } = customization;
  return (
    <div
      ref={frameRef}
      className="grid gap-1 relative"
      style={{
        width: "2in",
        height: "6in",
        gridTemplateRows: "1fr 1fr 14px 1fr 1fr",
        ...(selectedBg && {
          backgroundImage: `url("/backgrounds/${selectedBg}")`,
        }),
        ...(selectedColor && {
          backgroundColor: selectedColor,
        }),
      }}
    >
      {shots.slice(0, 2).map((shot) => (
        <div key={shot.id} className="w-full h-full overflow-hidden">
          <img src={shot.src!} className="w-full h-full object-cover" />
        </div>
      ))}

      <div className="flex justify-center items-center">
        {label?.isChecked && <LayoutLabel color={label.color} />}
      </div>

      {shots.slice(2).map((shot) => (
        <div key={shot.id + 2} className="w-full h-full overflow-hidden">
          <img src={shot.src!} className="w-full h-full object-cover" />
        </div>
      ))}

      {stickers?.map((sticker, index) => (
        <Fragment key={index}>
          <StickerItem sticker={sticker} />
        </Fragment>
      ))}
    </div>
  );
};
