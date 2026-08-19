import FourLayout from "../assets/four-layout.png";
import SixLayout from "../assets/six-layout.png";
import { Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Card className="flex-1 flex flex-col">
      <CardContent className="flex-1 flex ">
        {/* Left section */}
        <div className="flex flex-1 items-center justify-center ">
          <div className="relative h-80 w-80">
            <img
              src={FourLayout}
              alt="Four-layout"
              className="absolute top-1/2 left-10 w-30 -translate-y-1/2 rotate-[-8deg] border border-black shadow-[4px_4px_10px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out hover:scale-110"
            />

            <img
              src={SixLayout}
              alt="Six-layout"
              className="absolute top-1/2 left-30 w-50 -translate-y-1/2 rotate-[6deg] border border-black shadow-[4px_4px_10px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out hover:scale-110"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col flex-2 items-center justify-center">
          <div className="w-md text-center">
            <p className="text-background font-bright-kenly text-5xl">
              capture the moment
            </p>

            <p className="text-muted-foreground text-xl">
              step into our vintage-themed photobooth—where reflections become
              printed memories.
            </p>

            <Button className="mt-5 " onClick={() => navigate("/studio")}>
              <Camera className="size-5" />
              START
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomePage;
