import { LAYOUT_OPTIONS } from "@/constants/layout-options.constant";
import LayoutCard from "./LayoutCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

const LayoutOptions = ({
  onChangeTab,
}: {
  onChangeTab: (tab: string) => void;
}) => {
  return (
    <Carousel className="h-1/2 md:w-4xl w-full">
      <CarouselContent>
        {LAYOUT_OPTIONS.map((layout, index) => (
          <CarouselItem
            className="md:basis-1/3 basis-full h-full px-15"
            key={index}
          >
            <LayoutCard layout={layout} onChangeTab={onChangeTab} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default LayoutOptions;
