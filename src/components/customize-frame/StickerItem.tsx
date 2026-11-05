import type { StickerProp } from "@/types/sticker.type";
import { useRef } from "react";
import Draggable from "react-draggable";

const StickerItem = ({ sticker }: { sticker: StickerProp }) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable nodeRef={nodeRef} bounds="parent">
      <div
        ref={nodeRef}
        className="absolute cursor-grab active:cursor-grabbing"
      >
        <img
          src={sticker.src}
          data-type="sticker"
          draggable={false}
          style={{
            width: `${sticker.size}px`,
            height: "auto",
            transform: `rotate(${sticker.rotation}deg) `,
          }}
        />
      </div>
    </Draggable>
  );
};

export default StickerItem;
