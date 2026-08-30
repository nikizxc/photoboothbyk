import { Card, CardContent } from "./ui/card";

const ShotsSection = ({ shots, totalShots }: any) => {
  return (
    <Card className="h-125 w-60">
      <CardContent className="flex h-full flex-col gap-3">
        <p className="shrink-0 text-center font-semibold">
          shots {shots.length}/{totalShots}
        </p>

        <div className="flex min-h-0 flex-1 flex-col items-center gap-3 overflow-y-auto">
          {Array.from({ length: totalShots }).map((_, index) => (
            <div key={index} className="w-40 border-dashed border min-h-30">
              {shots[index] && (
                <img
                  src={shots[index]}
                  className="w-full h-full object-cover"
                  alt={`Shot ${index + 1}`}
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShotsSection;
