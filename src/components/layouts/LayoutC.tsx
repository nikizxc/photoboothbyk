import type { LayoutProps } from "@/types/layout.type";
import { Fragment } from "react/jsx-runtime";
import StickerItem from "../customize-frame/StickerItem";

export const LayoutC = ({
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
      className="flex flex-col bg-cover bg-center box-border relative "
      style={{
        width: "4in",
        height: "6in",
        padding: "4px",
        ...(selectedBg && {
          backgroundImage: `url("/backgrounds/${selectedBg}")`,
        }),
        ...(selectedColor && {
          backgroundColor: selectedColor,
        }),
      }}
    >
      <div
        className="grid grid-cols-2 gap-1 flex-1"
        style={{
          gridTemplateRows: `repeat(${Math.ceil(shots.length / 2)}, 1fr)`,
        }}
      >
        {shots.map((image: string, i: number) => (
          <div key={i} className="w-full h-full overflow-hidden">
            <img src={image} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div
        style={{
          padding: "4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {label?.isChecked && (
          <p
            className="font-bold text-[10px] tracking-wide"
            style={{ color: label.color }}
          >
            photoboothbyk
          </p>
        )}
      </div>

      {stickers?.map((sticker, index) => (
        <Fragment key={index}>
          <StickerItem sticker={sticker} />
        </Fragment>
      ))}
    </div>
  );
};
