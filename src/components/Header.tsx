import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const navigationItems = [
  { label: "home", path: "/" },
  { label: "how it works", path: "/how-it-works" },
  { label: "studio", path: "/studio" },
];

const Header = () => {
  const navigate = useNavigate();

  const currentLocation = window.location.pathname;

  return (
    <div className="w-full h-fit mb-10">
      <div className="flex justify-between items-center ">
        <p
          onClick={() => navigate("/")}
          className="font-bright-kenly text-4xl cursor-pointer drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]"
        >
          photoboothbyk
        </p>

        <div className="flex gap-6 ">
          {navigationItems.map(({ label, path }) => (
            <Button
              key={label}
              variant="ghost"
              className={`text-md tracking-tight ${currentLocation !== path && "text-foreground/70"}`}
              onClick={() => navigate(path)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
