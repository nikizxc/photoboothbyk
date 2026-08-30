import type { StickerProp } from "@/types/sticker.type";
import { useRef, useState } from "react";
import Draggable from "react-draggable";

const StickerItem = ({ sticker }: { sticker: StickerProp }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <Draggable nodeRef={nodeRef} bounds="parent">
      <div ref={nodeRef} className="absolute">
        <img
          src={sticker.src}
          style={{
            width: `${sticker.size}px`,
            height: "auto",
            transform: `rotate(${sticker.rotation}deg)`,
          }}
        />
      </div>
    </Draggable>
  );
};

export default StickerItem;
