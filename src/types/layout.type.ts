import type { Ref } from "react";
import type { StickerProp } from "./sticker.type";

export interface LayoutProps {
  frameRef: Ref<HTMLDivElement>;
  shots: string[];
  selectedBg: string | undefined;
  selectedColor: string | undefined;
  label: { isChecked: boolean; color: string };
  stickers: StickerProp[];
}
