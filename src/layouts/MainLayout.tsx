import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="bg-background w-full min-h-screen py-10 xl:px-40 md:px-20 px-10 text-foreground flex flex-col relative overflow-hidden">
      <Header />

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
