import type { LayoutProps } from "@/types/layout.type";
import { Fragment } from "react";

import StickerItem from "../customize-frame/StickerItem";
import { usePhotobooth } from "@/contexts/PhotoboothContext";
import LayoutLabel from "./LayoutLabel";

export const LayoutA = ({ frameRef }: LayoutProps) => {
  const { customization, shots } = usePhotobooth();
  const { selectedBg, selectedColor, label, stickers } = customization;

  return (
    <div
      ref={frameRef}
      style={{
        position: "relative",
        display: "grid",
        gap: "4px",
        width: "2in",
        height: "6in",
        padding: "5px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        gridTemplateRows: "1fr 1fr 1fr 0.5fr",
        ...(selectedBg && {
          backgroundImage: `url("/backgrounds/${selectedBg}")`,
        }),
        ...(selectedColor && {
          backgroundColor: selectedColor,
        }),
      }}
    >
      {shots.map((shot) => (
        <div
          key={shot.id}
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <img
            src={shot.src!}
            alt={`Shot-${shot.id}`}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
            }}
          />
        </div>
      ))}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {label?.isChecked && <LayoutLabel color={label.color} />}
      </div>

      {stickers?.map((sticker, index) => (
        <Fragment key={index}>
          <StickerItem sticker={sticker} />
        </Fragment>
      ))}
    </div>
  );
};
