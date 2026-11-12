import type { LayoutOptionsProps } from "@/types/layout.type";
import type { StickerProp } from "@/types/sticker.type";
import { createContext, useContext, useState } from "react";

type PhotoboothContextType = {
  shots: { id: number; src: null | string }[];
  setShots: React.Dispatch<
    React.SetStateAction<{ id: number; src: null | string }[]>
  >;
  selectedLayout: LayoutOptionsProps | null;
  setSelectedLayout: React.Dispatch<
    React.SetStateAction<LayoutOptionsProps | null>
  >;
  customization: Customization;
  setCustomization: React.Dispatch<React.SetStateAction<Customization>>;
  getShotsCount: () => number;
  onAddShot: (id: number, image: string) => void;
  onResetShot: () => void;
  onRemoveShot: (id: number) => void;
  onBackgroundChange: (value: string, type: string) => void;
  onLabelChange: ({ prop, value }: LabelProps) => void;
  onStickerAdd: (src: string) => void;
  onStickerChangeSize: (index: number, size: number) => void;
  onStickerRotate: (index: number, rotation: number) => void;
  onStickerRemove: (index: number) => void;
  onPhotoboothReset: () => void;
  onCustomizationReset: () => void;
};

type Customization = {
  selectedColor: string | undefined;
  selectedBg: string | undefined;
  label: {
    isChecked: boolean;
    color: string;
  };
  stickers: StickerProp[];
};

type LabelProps =
  { prop: "isChecked"; value: boolean } | { prop: "color"; value: string };

const PhotoboothContext = createContext<PhotoboothContextType | null>(null);

export function PhotoboothProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [shots, setShots] = useState<{ id: number; src: null | string }[]>([]);
  const [selectedLayout, setSelectedLayout] =
    useState<LayoutOptionsProps | null>(null);

  const [customization, setCustomization] = useState<Customization>({
    selectedColor: "#000000",
    selectedBg: undefined,
    label: {
      isChecked: true,
      color: "#FFFFFF",
    },
    stickers: [],
  });

  const getShotsCount = () => {
    return shots.filter((shot) => shot.src).length;
  };

  const onAddShot = (id: number, image: string) => {
    setShots((prev) =>
      prev.map((shot) => (shot.id === id ? { ...shot, src: image } : shot)),
    );
  };

  const onResetShot = () => {
    if (!selectedLayout) return;

    setShots(
      Array.from({ length: selectedLayout.shots }, (_, index) => {
        return {
          id: index,
          src: null,
        };
      }),
    );
  };

  const onRemoveShot = (id: number) => {
    const isConfirmed = confirm("Are you sure you want to remove this shot?");
    if (!isConfirmed) return;
    setShots((prev) =>
      prev.map((shot) => (shot.id === id ? { ...shot, src: null } : shot)),
    );
  };

  const onBackgroundChange = (value: string, type: string) => {
    setCustomization((prev) => ({
      ...prev,
      selectedColor: type === "color" ? value : undefined,
      selectedBg: type === "bg" ? value : undefined,
    }));
  };

  const onLabelChange = ({ prop, value }: LabelProps) => {
    setCustomization((prev) => ({
      ...prev,
      label: { ...customization.label, [prop]: value },
    }));
  };

  const onStickerAdd = (src: string) => {
    if (customization.stickers.length === 3) {
      alert("You can only add up to 3 stickers.");
      return;
    }
    const newSticker: StickerProp = {
      src,
      size: 50,
      rotation: 0,
    };

    setCustomization((prev) => ({
      ...prev,
      stickers: [...customization.stickers, newSticker],
    }));
  };

  const onStickerChangeSize = (index: number, size: number) => {
    const updatedStickers = customization.stickers.map((sticker, i) =>
      i === index ? { ...sticker, size } : sticker,
    );
    setCustomization((prev) => ({
      ...prev,
      stickers: updatedStickers,
    }));
  };

  const onStickerRotate = (index: number, rotation: number) => {
    const updatedStickers = customization.stickers.map((sticker, i) =>
      i === index ? { ...sticker, rotation } : sticker,
    );
    setCustomization((prev) => ({
      ...prev,
      stickers: updatedStickers,
    }));
  };

  const onStickerRemove = (index: number) => {
    const updatedStickers = customization.stickers.filter(
      (_, i) => i !== index,
    );
    setCustomization((prev) => ({
      ...prev,
      stickers: updatedStickers,
    }));
  };

  const onPhotoboothReset = () => {
    setShots([]);
    setSelectedLayout(null);
  };

  const onCustomizationReset = () => {
    setCustomization({
      selectedColor: "#000000",
      selectedBg: undefined,
      label: {
        isChecked: true,
        color: "#FFFFFF",
      },
      stickers: [],
    });
  };

  return (
    <PhotoboothContext.Provider
      value={{
        shots,
        setShots,
        selectedLayout,
        setSelectedLayout,
        customization,
        setCustomization,
        getShotsCount,
        onAddShot,
        onResetShot,
        onRemoveShot,
        onBackgroundChange,
        onLabelChange,
        onStickerAdd,
        onStickerChangeSize,
        onStickerRotate,
        onStickerRemove,
        onPhotoboothReset,
        onCustomizationReset,
      }}
    >
      {children}
    </PhotoboothContext.Provider>
  );
}

export function usePhotobooth() {
  const context = useContext(PhotoboothContext);

  if (!context) {
    throw new Error("usePhotobooth must be used within a PhotoboothProvider");
  }

  return context;
}
