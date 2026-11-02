import { createContext, useContext, useEffect, useState } from "react";

type SettingsContextType = {
  isFlashEnabled: boolean;
  isMirrored: boolean;
  timer: number;
  onSettingsChange: (prop: string, value: boolean | number) => void;
};

type SettingsProps = {
  flash: boolean;
  mirror: boolean;
  timer: number;
  
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const defaultSettings: SettingsProps = {
    flash: false,
    mirror: true,
    timer: 3,
  };

 

  const onGetSavedSettings = () => {
    try {
      const savedSettings = localStorage.getItem("photobooth-settings");

      return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
    } catch (error) {
      console.error(error);
    }
  };

  const [settings, setSettings] = useState<SettingsProps>(onGetSavedSettings);

  useEffect(() => {
    try {
      localStorage.setItem("photobooth-settings", JSON.stringify(settings));
    } catch (error) {
      console.error(error);
    }
  }, [settings]);

  const onSettingsChange = (prop: string, value: boolean | number) => {
    setSettings((prev) => ({
      ...prev,
      [prop]: value,
    }));
  };
  return (
    <SettingsContext.Provider
      value={{
        isFlashEnabled: settings.flash,
        isMirrored: settings.mirror,
        timer: settings.timer,
        onSettingsChange,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
}
