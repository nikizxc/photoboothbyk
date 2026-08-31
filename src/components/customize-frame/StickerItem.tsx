import type { StickerProp } from "@/types/sticker.type";
import { useRef } from "react";
import Draggable from "react-draggable";

const StickerItem = ({ sticker }: { sticker: StickerProp }) => {
  const nodeRef = useRef<HTMLImageElement>(null);

  return (
    <Draggable nodeRef={nodeRef} bounds="parent">
      <img
        ref={nodeRef}
        src={sticker.src}
        draggable={false}
        className="absolute cursor-grab active:cursor-grabbing"
        style={{
          width: `${sticker.size}px`,
          height: "auto",
          transform: `rotate(${sticker.rotation}deg) `,
        }}
      />
    </Draggable>
  );
};

export default StickerItem;
