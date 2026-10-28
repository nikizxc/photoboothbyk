import { LAYOUT_OPTIONS } from "@/constants/layout-options.constant";
import LayoutCard from "./LayoutCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { usePhotobooth } from "@/contexts/PhotoboothContext";

const LayoutOptions = ({
  onChangeTab,
}: {
  onChangeTab: (tab: string) => void;
}) => {
  const { setSelectedLayout, setShots } = usePhotobooth();

  return (
    <Carousel className=" h-1/2">
      <CarouselContent className="w-3xl  px-5">
        {LAYOUT_OPTIONS.map((layout, index) => (
          <CarouselItem
            className="basis-1/3 h-full"
            key={index}
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
            <LayoutCard layout={layout} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default LayoutOptions;
