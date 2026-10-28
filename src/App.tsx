import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import StudioPage from "./pages/StudioPage";
import { PhotoboothProvider } from "./contexts/PhotoboothContext";
import CustomizationPage from "./pages/CustomizationPage";
import StudioLayout from "./layouts/StudioLayout";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
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
                  <StudioPage />
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
    </BrowserRouter>
  );
}

export default App;
