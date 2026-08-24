import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { FILTER_OPTIONS } from "@/constants/filter-options.constant";
import Webcam from "react-webcam";

const FilterOptions = () => {
  return (
    <Carousel className="h-full">
      <CarouselContent className="h-full flex flex-wrap  gap-2">
        {Object.entries(FILTER_OPTIONS).map(([key, value], index) => (
          <CarouselItem key={index} className="basis-[calc(33.333%-0.5rem)]">
            <Webcam
              className="h-full w-full object-cover"
              style={{ filter: value }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default FilterOptions;
