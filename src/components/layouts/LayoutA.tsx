import type { LayoutProps } from "@/types/layout.type";
import { Fragment, useRef, useState } from "react";

import StickerItem from "../customize-frame/StickerItem";
export const LayoutA = ({
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
      className="grid gap-1 bg-cover bg-center relative"
      style={{
        width: "2in",
        height: "6in",
        padding: "5px",
        gridTemplateRows: "1fr 1fr 1fr 0.5fr",
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

      <div className=" flex justify-center items-center">
        {label?.isChecked && (
          <p
            className="text-center font-bold text-[10px] tracking-wide shrink-0 pt-1"
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
