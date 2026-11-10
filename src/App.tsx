import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import StudioLayout from "./layouts/StudioLayout";
import NotFound from "./components/NotFound";

import { PhotoboothProvider } from "./contexts/PhotoboothContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";

const StudioPage = lazy(() => import("./pages/StudioPage"));
const CustomizationPage = lazy(() => import("./pages/CustomizationPage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="*" element={<NotFound />}></Route>
            <Route index element={<HomePage />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />

            <Route path="/studio" element={<StudioLayout />}>
              <Route
                index
                element={
                  <PhotoboothProvider>
                    <SettingsProvider>
                      <StudioPage />
                    </SettingsProvider>
                  </PhotoboothProvider>
                }
              />
              <Route
                path="customization"
                element={
                  <PhotoboothProvider>
                    <CustomizationPage />
                  </PhotoboothProvider>
                }
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
