import type { LAYOUT_OPTIONS } from "@/constants/layout-options.constant";
import { usePhotobooth } from "@/contexts/PhotoboothContext";

const LayoutCard = ({
  layout,
  onChangeTab,
}: {
  layout: (typeof LAYOUT_OPTIONS)[0];
  onChangeTab: (tab: string) => void;
}) => {
  const { setSelectedLayout, setShots } = usePhotobooth();
  return (
    <div className="flex flex-col gap-2 py-3 rounded-md items-center">
      <div
        className="md:w-50 md:h-80 w-40 h-70"
        onClick={() => {
          setSelectedLayout(layout);
          onChangeTab("start-capturing");
          setShots(
            Array.from({ length: layout.shots }, (_, index) => {
              return {
                id: index,
                src: null,
              };
            }),
          );
        }}
      >
        <img
          alt={`${layout.file}`}
          src={`layouts/${layout.file}`}
          className="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform"
        />
      </div>

      <div className="text-center">
        <p className="md:text-lg text-base">{layout.label}</p>
        <p className="text-muted-foreground md:text-sm text-xs">
          {layout.size.width} x {layout.size.height} in ({layout.shots} shot
          {layout.shots > 1 && "s"})
        </p>
      </div>
    </div>
  );
};

export default LayoutCard;
