import { useState } from "react";
import LayoutOptions from "../components/LayoutOptions";
import StartCapturing from "../components/StartCapturing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePhotobooth } from "@/contexts/PhotoboothContext";

const StudioPage = () => {
  const [activeTab, setActiveTab] = useState<string>("choose-layout");
  const { selectedLayout, setSelectedLayout, setShots, setCustomization } =
    usePhotobooth();

  const resetPhotobooth = () => {
    setShots([]);
    setSelectedLayout(null);
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
    <div className="flex flex-1 flex-col gap-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex h-full w-full flex-1 flex-col gap-5"
      >
        <TabsList className="gap-1">
          <TabsTrigger value="choose-layout" onClick={resetPhotobooth}>
            choose a layout
          </TabsTrigger>

          <TabsTrigger
            disabled={selectedLayout === null}
            value="start-capturing"
          >
            start capturing
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="choose-layout"
          className="flex flex-col w-full flex-1  justify-center items-center gap-6"
        >
          <div className="w-100 text-center">
            <p className="text-muted-foreground text-lg">
              select how your photos will be framed from our classic or template
              layouts
            </p>
          </div>
          <LayoutOptions onChangeTab={(tab) => setActiveTab(tab)} />
        </TabsContent>

        <TabsContent value="start-capturing" className="flex w-full flex-1">
          <StartCapturing />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudioPage;
