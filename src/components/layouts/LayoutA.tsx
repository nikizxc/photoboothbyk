import type { LayoutProps } from "@/types/layout.type";
import { Fragment } from "react";

import StickerItem from "../customize-frame/StickerItem";
import { usePhotobooth } from "@/contexts/PhotoboothContext";

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
      {shots.map((image: string, i: number) => (
        <div
          key={i}
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <img
            src={image}
            alt={`shot-${i}`}
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
        {label?.isChecked && (
          <p
            style={{
              margin: 0,
              paddingTop: "4px",
              textAlign: "center",
              fontWeight: 700,
              fontSize: "10px",
              letterSpacing: "0.025em",
              color: label.color,
              flexShrink: 0,
            }}
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
