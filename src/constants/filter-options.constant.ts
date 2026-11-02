import { ColorMatrixFilter, Filter } from "pixi.js";
import { OldFilmFilter, GrayscaleFilter } from "pixi-filters";
import { makeVintage } from "@/constants/custom-filters.constant";

export const FILTERS_OPTIONS: Record<string, () => Filter[]> = {
  none: () => [],
  sepia: () => {
    const f = new ColorMatrixFilter();
    f.sepia(false);
    return [f];
  },
  kodachrome: () => {
    const f = new ColorMatrixFilter();
    f.kodachrome(false);
    return [f];
  },
  vintage: () => [makeVintage()],
  grayscale: () => [new GrayscaleFilter()],
};
