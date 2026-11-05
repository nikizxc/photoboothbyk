import { NAVIGATION_ITEMS } from "@/constants/navigation-items.constant";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="w-full h-fit mb-10 flex justify-between items-center">
      <Link
        to="/"
        className="font-bright-kenly md:text-4xl text-2xl cursor-pointer drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]"
      >
        photoboothbyk
      </Link>

      <nav className="md:block hidden">
        <ul className="flex gap-6 ">
          {NAVIGATION_ITEMS.map(({ label, path }) => (
            <li key={label}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `hover:text-primary-foreground text-base font-semibold ${
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="md:hidden block">
        <Button
          variant="icon"
          className="p-0!"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu />
        </Button>

        <div
          className={`transition-transform duration-300 absolute top-0 left-0 bg-background w-full h-full z-10 p-10 flex flex-col gap-6 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <Button
            variant="icon"
            className="p-0! ml-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <X />
          </Button>
          <ul className="flex flex-col gap-6 ">
            {NAVIGATION_ITEMS.map(({ label, path }) => (
              <li key={label}>
                <NavLink
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `hover:text-primary-foreground text-base font-semibold ${
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
