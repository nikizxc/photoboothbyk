import { useEffect, useState } from "react";
import { FILTERS_OPTIONS } from "@/constants/filter-options.constant";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./ui/carousel";

const FilterOptions = ({
  onFilterChange,
}: {
  onFilterChange: (key: string) => void;
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);

  const keys = Object.keys(FILTERS_OPTIONS);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelected(api.selectedScrollSnap());
      onFilterChange(keys[selected]);
    };
    onSelect();

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="h-full md:min-w-0 md:w-80 w-0 min-w-full rounded-md border bg-secondary-background p-1">
      <Carousel
        setApi={setApi}
        opts={{ align: "center", containScroll: false }}
        className="h-full w-full"
      >
        <CarouselContent className="ml-0 h-full">
          {keys.map((key, index) => {
            const active = index === selected;
            return (
              <CarouselItem key={key} className="flex h-full basis-15 pl-0">
                <button
                  type="button"
                  aria-label={key}
                  onClick={() => {
                    api?.scrollTo(index);
                    onFilterChange(keys[index]);
                  }}
                  className={`aspect-square h-full rounded-md border-2 transition-all duration-200 ${
                    active ? "border-primary" : "border-muted-foreground"
                  }`}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default FilterOptions;
