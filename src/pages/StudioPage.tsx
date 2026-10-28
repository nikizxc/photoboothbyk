import { useState } from "react";
import LayoutOptions from "../components/LayoutOptions";
import StartCapturing from "../components/StartCapturing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePhotobooth } from "@/contexts/PhotoboothContext";
import { useLocation } from "react-router-dom";

const StudioPage = () => {
  const returnTo = useLocation().state;

  const [activeTab, setActiveTab] = useState<string>(
    returnTo ?? "choose-layout",
  );
  const { selectedLayout, onPhotoboothReset } = usePhotobooth();

  return (
    <div className="flex flex-1 flex-col gap-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex h-full w-full flex-1 flex-col gap-5"
      >
        <TabsList className="gap-1">
          <TabsTrigger value="choose-layout" onClick={onPhotoboothReset}>
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
          className="flex flex-col w-full flex-1 justify-center items-center gap-6"
        >
          <p className="text-muted-foreground text-lg w-100 text-center">
            select how your photos will be framed from our classic or template
            layouts
          </p>

          <LayoutOptions onChangeTab={(tab) => setActiveTab(tab)} />
        </TabsContent>

        <TabsContent
          value="start-capturing"
          className="flex w-full flex-1 flex-col gap-6 items-center"
        >
          <StartCapturing />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudioPage;
