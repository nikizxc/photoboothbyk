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
  setLayoutId,
  setActiveTab,
  setTotalShots,
}: {
  setLayoutId: React.Dispatch<
    React.SetStateAction<null | React.ComponentType<{
      shots: string[];
    }>>
  >;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setTotalShots: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  return (
    <Carousel className=" h-1/2">
      <CarouselContent className="w-3xl  px-5">
        {LAYOUT_OPTIONS.map((layout, index) => (
          <CarouselItem
            className="basis-1/3 h-full"
            key={index}
            onClick={() => {
              setLayoutId(() => layout.frame);
              setActiveTab("start-capturing");
              setTotalShots(layout.shots);
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
