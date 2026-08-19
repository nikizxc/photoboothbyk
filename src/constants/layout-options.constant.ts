import { LayoutA } from "@/components/layouts/LayoutA";
import { LayoutB } from "@/components/layouts/LayoutB";
import { LayoutC } from "@/components/layouts/LayoutC";
import { Vintage } from "@/components/layouts/Vintage";

export const LAYOUT_OPTIONS = [
  {
    label: "Layout A",
    shots: 3,
    frame: LayoutA,
    file: "layout-a.png",
    size: { width: 2, height: 6 },
  },
  {
    label: "Layout B",
    shots: 4,
    frame: LayoutB,
    file: "layout-b.png",
    size: { width: 2, height: 6 },
  },
  {
    label: "Layout C",
    shots: 6,
    frame: LayoutC,
    file: "layout-c.png",
    size: { width: 4, height: 6 },
  },
  {
    label: "Vintage",
    shots: 4,
    frame: Vintage,
    file: "vintage.png",
    size: { width: 2, height: 6 },
  },
];
