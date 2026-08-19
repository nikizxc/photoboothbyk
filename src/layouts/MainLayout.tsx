import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="bg-background w-full min-h-screen py-10 px-40 text-foreground flex flex-col">
      <Header />

      <Outlet />
    </div>
  );
};

export default MainLayout;
