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
    <section aria-label="Shots">
      <Card className="h-125 w-60">
        <CardContent className="flex h-full flex-col gap-3">
          <p className="shrink-0 text-center font-semibold">
            shots {getShotsCount()}/{selectedLayout?.shots}
          </p>

          <div className="min-h-0 flex-1 overflow-y-auto">
            <ul className="flex flex-col items-center gap-3">
              {shots.map((shot) => (
                <li
                  key={shot.id}
                  className="relative w-40 border-dashed border border-muted-foreground h-30 flex justify-center items-center overflow-hidden"
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
                      <span className="text-xs text-muted-foreground">
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
