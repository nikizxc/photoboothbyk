import { NAVIGATION_ITEMS } from "@/constants/navigation-items.constant";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full h-fit mb-10 flex justify-between items-center">
      <Link
        to="/"
        className="font-bright-kenly text-4xl cursor-pointer drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]"
      >
        photoboothbyk
      </Link>

      <nav>
        <ul className="flex gap-6 ">
          {NAVIGATION_ITEMS.map(({ label, path }) => (
            <li key={label}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `hover:text-primary-foreground text-md font-semibold ${
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
    </header>
  );
};

export default Header;
