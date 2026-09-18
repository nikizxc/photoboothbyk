import type { LAYOUT_OPTIONS } from "@/constants/layout-options.constant";

const LayoutCard = ({ layout }: { layout: (typeof LAYOUT_OPTIONS)[0] }) => {
  return (
    <div className="flex flex-col gap-2 py-3 rounded-md items-center">
      <img
        alt={`${layout.file}`}
        src={`layouts/${layout.file}`}
        className="w-auto h-75 cursor-pointer hover:scale-105 transition-transform"
      />

      <div className="text-center">
        <p className="text-lg">{layout.label}</p>
        <p className="text-muted-foreground">
          {layout.size.width} x {layout.size.height} in ({layout.shots} shot
          {layout.shots > 1 && "s"})
        </p>
      </div>
    </div>
  );
};

export default LayoutCard;
