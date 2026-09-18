import type { LayoutOptionsProps } from "@/types/layout.type";
import type { StickerProp } from "@/types/sticker.type";
import { createContext, useContext, useState } from "react";

type PhotoboothContextType = {
  shots: string[];
  setShots: React.Dispatch<React.SetStateAction<string[]>>;
  selectedLayout: LayoutOptionsProps | null;
  setSelectedLayout: React.Dispatch<
    React.SetStateAction<LayoutOptionsProps | null>
  >;
  customization: Customization;
  setCustomization: React.Dispatch<React.SetStateAction<Customization>>;
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

const PhotoboothContext = createContext<PhotoboothContextType | null>(null);

export function PhotoboothProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [shots, setShots] = useState<string[]>([]);
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

  return (
    <PhotoboothContext.Provider
      value={{
        shots,
        setShots,
        selectedLayout,
        setSelectedLayout,
        customization,
        setCustomization,
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
