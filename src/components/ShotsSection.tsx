import { ImagePlus, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { usePhotobooth } from "@/contexts/PhotoboothContext";

const ShotsSection = () => {
  const { shots, getShotsCount, selectedLayout, onAddShot, onRemoveShot } =
    usePhotobooth();
  const handleImageUpload = (id: number, file: FileList | null) => {
    if (!file?.[0]) {
      return;
    }

    onAddShot(id, URL.createObjectURL(file[0]));
  };

  return (
    <section
      aria-label="Shots"
      className="w-full min-w-0 lg:h-125 lg:w-60 lg:shrink-0"
    >
      <Card className="w-full h-full">
        <CardContent className="flex h-full flex-col gap-3">
          <p className="shrink-0 text-center font-semibold">
            shots {getShotsCount()}/{selectedLayout?.shots}
          </p>

          <div className="min-h-0 max-h-80 flex-1 overflow-y-auto lg:max-h-none">
            <ul className="flex lg:flex-col flex-row flex-wrap items-center gap-3">
              {shots.map((shot) => (
                <li
                  key={shot.id}
                  className="relative md:w-40 w-35 border-dashed border border-muted-foreground h-30 flex justify-center items-center overflow-hidden"
                >
                  {shot.src ? (
                    <>
                      <img
                        src={shot.src}
                        className="object-cover w-full h-full"
                        alt={`Shot ${shot.id}`}
                      />
                      <Button
                        className="absolute top-2 right-2 size-7 rounded-full p-0 "
                        variant="secondary"
                        size="icon"
                        onClick={() => onRemoveShot(shot.id)}
                      >
                        <X className="size-4" />
                      </Button>
                    </>
                  ) : (
                    <label className="cursor-pointer">
                      <ImagePlus className="text-muted-foreground m-auto" />
                      <span className="md:text-xs text-[10px] text-muted-foreground">
                        upload photo
                      </span>

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          handleImageUpload(shot.id, e.target.files);
                        }}
                      />
                    </label>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ShotsSection;
