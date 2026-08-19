import type { LAYOUT_OPTIONS } from "@/constants/layout-options.constant";

import { Card, CardContent } from "./ui/card";

const LayoutCard = ({ layout }: { layout: (typeof LAYOUT_OPTIONS)[0] }) => {
  return (
    <div className="flex flex-col gap-2 hover:border cursor-pointer p-1 rounded-md items-center">
      <Card className="h-70 w-50">
        <CardContent>
          {/* <img alt={`${layout.fileName}`} src={`layouts/${layout.fileName}`} /> */}
        </CardContent>
      </Card>

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
