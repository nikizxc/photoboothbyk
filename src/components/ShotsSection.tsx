import { ImagePlus, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const ShotsSection = ({ shots, totalShots, onAddShot, onRemoveShot }: any) => {
  const handleImageUpload = (file: FileList | null) => {
    if (!file?.[0]) {
      return;
    }

    onAddShot(URL.createObjectURL(file[0]));
  };
  return (
    <Card className="h-125 w-60">
      <CardContent className="flex h-full flex-col gap-3">
        <p className="shrink-0 text-center font-semibold">
          shots {shots.length}/{totalShots}
        </p>

        <div className="flex min-h-0 flex-1 flex-col items-center gap-3 overflow-y-auto">
          {Array.from({ length: totalShots }).map((_, index) => (
            <div
              key={index}
              className="relative w-40 border-dashed border border-muted-foreground h-35 flex justify-center items-center overflow-hidden"
            >
              {shots[index] ? (
                <>
                  <img
                    src={shots[index]}
                    className="object-cover w-full h-full"
                    alt={`Shot ${index + 1}`}
                  />
                  <Button
                    className="absolute top-2 right-2 size-7 rounded-full p-0 backdrop-blur-sm "
                    variant="secondary"
                    size="icon"
                    onClick={() => onRemoveShot(index)}
                  >
                    <X className="size-4" strokeWidth={2} />
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
                      handleImageUpload(e.target.files);
                    }}
                  />
                </label>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShotsSection;
