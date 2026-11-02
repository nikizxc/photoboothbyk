import { ArrowRight, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col flex-1">
      <CardContent className="flex flex-1">
        <div className="flex-1 items-center justify-center xl:flex hidden">
          <div className="relative h-80 w-80">
            <img
              src="layouts/vintage.png"
              alt="Four-layout"
              className="absolute top-1/2 left-10 w-30 -translate-y-1/2 rotate-[-8deg]  shadow-[4px_4px_10px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out hover:scale-110"
            />

            <img
              src="layouts/layout-c.png"
              alt="Six-layout"
              className="absolute top-1/2 left-30 w-50 -translate-y-1/2 rotate-6 shadow-[4px_4px_10px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out hover:scale-110"
            />
          </div>
        </div>

        <div className="flex flex-col flex-2 items-center justify-center relative">
          <div className="lg:w-lg w-full text-center">
            <h1 className="text-background font-bright-kenly xl:text-6xl md:text-5xl text-3xl">
              capture the moment
            </h1>

            <p className="text-muted-foreground xl:text-xl md:text-lg text-sm">
              step into our online photobooth—create, customize, and turn every
              snapshot into a memory worth keeping.
            </p>

            <Button
              variant="default"
              className="mt-5"
              onClick={() => navigate("/studio")}
            >
              START
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomePage;
